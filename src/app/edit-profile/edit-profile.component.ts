import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { User } from '../model/usermodel/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [RouterLink, RouterModule, HttpClientModule, CommonModule],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  userId: string = "";
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
    this.http.get(this.dataService.apiEndpoint + '/showuser/' + this.userId).subscribe((response: any) => {
      console.log('get inform success');
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
      user_id: this.userId
    };
    console.log(UserData);

    this.http.post(this.dataService.apiEndpoint + '/UpdateUser', UserData).subscribe((response: any) => {
      console.log('update user success');
      sessionStorage.setItem('userData', JSON.stringify(response.updateUser));
      location.reload();
    });
  }
}
