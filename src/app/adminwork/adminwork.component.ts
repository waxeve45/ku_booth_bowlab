import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { DataService } from '../../data.service';
import { User } from '../model/usermodel/user.model';
import { Work } from '../model/workmodel/work.model';

@Component({
  selector: 'app-adminwork',
  standalone: true,
  imports: [RouterLink,RouterModule,CommonModule,HttpClientModule],
  templateUrl: './adminwork.component.html',
  styleUrl: './adminwork.component.scss'
})
export class AdminworkComponent implements OnInit {
editWork(_t32: Work) {
throw new Error('Method not implemented.');
}
deleteWork(arg0: any) {
throw new Error('Method not implemented.');
}
    works : Work[] = [];
  
    constructor(
    private dataService: DataService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
    ){}
  
    ngOnInit(){
      this.getwork();
    }
  
    getwork(){
      this.http.get(this.dataService.apiEndpoint + '/getWork').subscribe((respone: any) => {
        this.works = respone;
      })
    }
}
