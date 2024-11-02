import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { User } from '../model/usermodel/user.model';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [RouterLink, RouterModule, HttpClientModule, CommonModule],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  userId: string = '';
  user: User[] = [];

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
      this.userId = user.user_id;
      console.log(this.userId);
      this.getMyuser();
    }
  }

  getMyuser() {
    this.http
      .get(this.dataService.apiEndpoint + '/showuser/' + this.userId)
      .subscribe((response: any) => {
        console.log('User information retrieved successfully');
        this.user = response;
        console.log(this.user);
      });
  }

  UpDateUser(prefix: any, fname: any, lname: any, phone: any, email: any) {
    const UserData = {
      prefix: prefix,
      fname: fname,
      lname: lname,
      phone: phone,
      email: email,
      user_id: this.userId,
    };
    console.log(UserData);

// Confirm the update action
Swal.fire({
  title: 'ยืนยันการอัปเดต',
  text: 'คุณแน่ใจหรือไม่ว่าต้องการอัปเดตข้อมูลโปรไฟล์ของคุณ?',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'ใช่, อัปเดตเลย!',
  cancelButtonText: 'ยกเลิก',
}).then((result) => {
  if (result.isConfirmed) {
    this.http
      .post(this.dataService.apiEndpoint + '/UpdateUser', UserData)
      .subscribe(
        (response: any) => {
          console.log('User updated successfully');
          sessionStorage.setItem('userData', JSON.stringify(response.updateUser));
          
          // Success alert
          Swal.fire({
            title: 'อัปเดตเรียบร้อย!',
            text: 'โปรไฟล์ของคุณได้รับการอัปเดตเรียบร้อยแล้ว',
            icon: 'success',
            confirmButtonText: 'ตกลง',
          }).then(() => {
            this.router.navigate(['EditProfile']);
          });
        },
        (error) => {
          console.error('Update failed:', error);
          
          // Error alert
          Swal.fire({
            title: 'เกิดข้อผิดพลาด',
            text: 'มีข้อผิดพลาดในการอัปเดตโปรไฟล์ของคุณ',
            icon: 'error',
            confirmButtonText: 'ตกลง',
          });
        }
      );
  } else {
    console.log('Update canceled');
  }
});

  }
}