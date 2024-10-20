import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent {

  constructor(
    private dataService: DataService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(){
    
  }
}
