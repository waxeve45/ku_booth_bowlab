import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, HttpClientModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(
    private http: HttpClient,
    private router: Router,
    private dataService: DataService
  ) {}

  checkEmailExists(email: string) {
    return this.http.post(this.dataService.apiEndpoint + '/check-email', { email });
  }

  register(prefix: any, fname: any, lname: any, phone: any, email: any, password: any, confirm_password: any) {
    if (password !== confirm_password) {
      Swal.fire({
        icon: 'error',
        title: 'รหัสผ่านไม่ตรงกัน',
        text: 'กรุณากรอกรหัสผ่านให้ตรงกัน',
        confirmButtonText: 'ตกลง'
      });
      return;
    }

    // Check if email exists
    this.checkEmailExists(email).subscribe(
      (exists: any) => {
        if (exists.error) {
          Swal.fire({
            icon: 'error',
            title: 'มี Email ในระบบอยู่แล้ว',
            text: 'กรุณาใช้ Email อื่น',
            confirmButtonText: 'ตกลง'
          });
          return;
        }

        const registerData = {
          prefix, 
          fname,
          lname,
          phone,
          email,
          password
        };

        this.http.post(this.dataService.apiEndpoint + '/register2', registerData).subscribe(
          (response: any) => {
            Swal.fire({
              icon: 'success',
              title: 'สมัครสมาชิกสำเร็จ',
              text: 'ยินดีต้อนรับ! คุณได้สมัครสมาชิกเรียบร้อยแล้ว',
              confirmButtonText: 'ตกลง'
            }).then(() => {
              this.router.navigate(['/login']);
            });
          },
          (error) => {
            if (error.error.error) {
              Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: error.error.error,
                confirmButtonText: 'ตกลง'
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: 'ไม่สามารถสมัครสมาชิกได้ กรุณาลองใหม่อีกครั้ง',
                confirmButtonText: 'ตกลง'
              });
            }
            console.error('เกิดข้อผิดพลาดในการสมัครสมาชิก:', error);
          }
        );
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'ไม่สามารถตรวจสอบอีเมลได้ กรุณาลองใหม่อีกครั้ง',
          confirmButtonText: 'ตกลง'
        });
        console.error('เกิดข้อผิดพลาดในการตรวจสอบอีเมล:', error);
      }
    );
  }
}
