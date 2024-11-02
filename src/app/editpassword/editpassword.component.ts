import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { DataService } from '../../data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { User } from '../model/usermodel/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editpassword',
  standalone: true,
  imports: [RouterLink, RouterModule, HttpClientModule, CommonModule],
  templateUrl: './editpassword.component.html',
  styleUrls: ['./editpassword.component.scss']
})
export class EditpasswordComponent implements OnInit {
  user: User[] = [];
  user_id: string = '';
  fname: string = '';

  constructor(
    private dataService: DataService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const userData = sessionStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      this.fname = user.fname;
      this.user_id = user.user_id;
      console.log(user);
    }
    this.user_id = this.route.snapshot.paramMap.get('userId') || '';
    console.log('Received userId:', this.user_id);
  }

  updatePass(current_password: string, new_password: string, confirm_password: string) {
    if (!current_password || !new_password || !confirm_password) {
      Swal.fire({
        title: 'Missing Information',
        text: 'Please fill in all password fields.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return;
    }

    if (new_password !== confirm_password) {
      Swal.fire({
        title: 'Passwords Do Not Match',
        text: 'The new password and confirmation do not match.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    const passwordData = {
      user_id: this.user_id,
      current_password: current_password,
      new_password: new_password,
      confirm_password: confirm_password,
    };

    console.log(passwordData);

  this.http.post(this.dataService.apiEndpoint + '/Passwords', passwordData)
    .subscribe({
      next: (response: any) => {
        console.log('Password updated successfully');
        Swal.fire({
          title: 'สำเร็จ',
          text: 'รหัสผ่านของคุณได้รับการอัปเดตเรียบร้อยแล้ว!',
          icon: 'success',
          confirmButtonText: 'ตกลง',
        }).then(() => {
          this.router.navigate(['/EditProfile']);
        });
      },
      error: (error) => {
        console.error('Error updating password:', error);
        Swal.fire({
          title: 'อัปเดตล้มเหลว',
          text: 'เกิดข้อผิดพลาดในการอัปเดตรหัสผ่านของคุณ กรุณาลองใหม่อีกครั้ง',
          icon: 'error',
          confirmButtonText: 'ตกลง',
        });
      },
    });
  }
}

  // UpDateUser(prefix: any, fname: any, lname: any, phone: any, email: any) {
  //   const UserData = {
  //     prefix: prefix,
  //     fname: fname,
  //     lname: lname,
  //     phone: phone,
  //     email: email,
  //     user_id: this.userId
  //   };
  //   console.log(UserData);
  // }

