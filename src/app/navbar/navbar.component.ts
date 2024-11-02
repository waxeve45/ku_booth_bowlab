import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, HttpClientModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  email: string = '';
  prefix: string = '';
  fname: string = '';
  lname: string = '';
  role: number = 0;

  constructor(
    private http: HttpClient,
    private dataService: DataService,
    private route: Router
  ) {}

  ngOnInit() {
    const userData = sessionStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      this.email = user.email;
      this.fname = user.fname;
      this.lname = user.lname;
      this.prefix = user.prefix;
      this.role = user.role;
      console.log(user);
    }
  }

  logout() {
    Swal.fire({
      icon: 'warning',
      title: 'คุณแน่ใจว่าจะออกจากระบบ',
      text: 'คุณต้องการออกจากระบบหรือไม่?',
      showCancelButton: true,
      confirmButtonText: 'ใช่, ออกจากระบบ',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem('isLoggedin');
        sessionStorage.removeItem('userData');
        this.route.navigate(['']).then(() => {
          window.location.reload();
        });
      }
    });
  }
}
