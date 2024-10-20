import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { CommonModule } from '@angular/common';

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
  // email: string = '';

constructor(
  private http: HttpClient,
  private dataService: DataService,
  private route: Router
){}

ngOnInit(){
  // const = ประกาศค่าคงที่
  const userData = sessionStorage.getItem('userData');
  if(userData){
    const user = JSON.parse(userData);
    this.email = user.email;
    this.fname = user.fname;
    this.lname = user.lname;
    this.prefix = user.prefix;
    console.log(user);
    
  }
}

 logout(){
  sessionStorage.removeItem('isLoggedin');
  sessionStorage.removeItem('userData');
  this.route.navigate(['']).then(() =>{
    window.location.reload();
  })
 }


}
