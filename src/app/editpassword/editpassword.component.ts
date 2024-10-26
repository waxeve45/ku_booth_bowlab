import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { DataService } from '../../data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { User } from '../model/usermodel/user.model';

@Component({
  selector: 'app-editpassword',
  standalone: true,
  imports: [RouterLink, RouterModule, HttpClientModule, CommonModule],
  templateUrl: './editpassword.component.html',
  styleUrls: ['./editpassword.component.scss']
})
export class EditpasswordComponent {

  // userId: string = '';
  user: User[] = [];
  user_id: string = '';
  fname: string = '';

  constructor(
    private dataService: DataService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  updatePass(current_password: string, new_password: string, confirm_password: string) {
    if (new_password !== confirm_password) {
      console.log('รหัสผ่านไม่ตรงกัน');
      return;
    }

    if (!current_password || !new_password || !confirm_password) {
      console.log('กรุณากรอกรหัสผ่านทุกช่อง');
      return;
    }

    const passwordData = {
      user_id: this.user_id,
      current_password: current_password,
      new_password: new_password,
      confirm_password: confirm_password
    };

    console.log(passwordData);

    this.http.post(this.dataService.apiEndpoint + '/Passwords', passwordData)
      .subscribe({
        next: (response: any) => {
          console.log('เปลี่ยนรหัสเรียบร้อย');
          this.router.navigate(['/EditProfile']);
        },
        error: (error) => {
          console.error('Error updating password:', error);
        }
      });
  }

  // ngOnInit(): void {
    ngOnInit(){
      const userData = sessionStorage.getItem('userData');
      if(userData){
        const user = JSON.parse(userData);
        this.fname = user.fname
        this.user_id = user.user_id
        console.log(user);
      }
    this.user_id = this.route.snapshot.paramMap.get('userId') || '';
    console.log('Received userId:', this.user_id);
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

