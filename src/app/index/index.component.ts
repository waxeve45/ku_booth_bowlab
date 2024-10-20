import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { Zone } from '../model/zonemodel/zone.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterLink, HttpClientModule, CommonModule],  
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})

export class IndexComponent  {
  zones: Zone[] = [];

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params); 
      this.dataService.getZones(params).subscribe(
        (data) => {
          this.zones = data;
        }
      );
    });
  }
}
