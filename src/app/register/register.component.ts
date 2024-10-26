import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, HttpClientModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

 constructor(
  private http: HttpClient,
  private router: Router,
  private dataService: DataService
 ){}

 register(prefix: any, fname: any, lname: any, phone: any, email: any, password: any, confirm_password: any) {
  if (password != confirm_password) {
    console.log("รหัสผ่านไม่ตรงกัน");
    return; // Stop the registration process if passwords don't match
  }
  
  const registerData = {
    prefix: prefix, 
    fname: fname,
    lname: lname,
    phone: phone,
    email: email,
    password: password
  };

  console.log(registerData);
  
  
  this.http.post(this.dataService.apiEndpoint + '/register2', registerData).subscribe((response: any) => {
    console.log("register success");
  });
}


}
