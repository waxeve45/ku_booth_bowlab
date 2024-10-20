import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { Zone } from '../model/zonemodel/zone.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterLink, HttpClientModule, CommonModule],  
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  //ประกาศตัวแปรเพื่อเก็บข้อมูล
  zones: Zone[] = [];
  

  //ประกาศ construnctor 
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
  ) {}

  //การทำงาน เพื่อเปิดหน้าเว็บแอปพลิเคชัน เรียกใช้ฟังก์ชันที่อยู่ใน ngOnit 
  ngOnInit() {
    this.getAllZone();
  }

  // function เรียกข้อมูลโซนทั้งหมด
  getAllZone(){
    this.http.get(this.dataService.apiEndpoint + '/ShowGeneralZone').subscribe((response: any) => {
      this.zones = response;
    })
  }


}


































