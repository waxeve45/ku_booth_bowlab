import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-adminnavbar',
  standalone: true,
  imports: [RouterLink, CommonModule,HttpClientModule],
  templateUrl: './adminnavbar.component.html',
  styleUrl: './adminnavbar.component.scss'
})

export class AdminnavbarComponent {
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
    sessionStorage.removeItem('isLoggedin');
    sessionStorage.removeItem('userData');
    this.route.navigate(['']).then(() => {
      window.location.reload();
    });
  }
}
