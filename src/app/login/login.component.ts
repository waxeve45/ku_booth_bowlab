import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { DataService } from '../../data.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, HttpClientModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private http: HttpClient,
    private router: Router,
    private dataService: DataService
  ) {}

  login(email: string, password: string) {
    if(!email || !password){
      console.log("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
      
    }
    
    const loginData = {
      email,password
    };
    console.log(this.login);
    
    this.http.post(this.dataService.apiEndpoint+ '/login', loginData).subscribe((response: any) => {
      console.log("login success");
      
    });

  }
 
}
