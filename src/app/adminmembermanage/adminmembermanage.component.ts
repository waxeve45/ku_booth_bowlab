import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { DataService } from '../../data.service';
import { User } from '../model/usermodel/user.model'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adminmembermanage',
  standalone: true,
  imports: [RouterLink, RouterModule, HttpClientModule, CommonModule],
  templateUrl: './adminmembermanage.component.html',
  styleUrl: './adminmembermanage.component.scss'
})
export class AdminmembermanageComponent implements OnInit {
  user : User[] = [];

  constructor(
  private dataService: DataService,
  private http: HttpClient,
  private router: Router,
  private route: ActivatedRoute
  ){}

  ngOnInit(){
    this.getuser();
  }

  getuser(){
    this.http.get(this.dataService.apiEndpoint + '/showAlluser').subscribe((respone: any) => {
      this.user = respone;
    })
  }
}
