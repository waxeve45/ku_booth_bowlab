import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { Booth } from '../model/boothmodel/booth.model';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-zone-a',
  standalone: true,
  imports: [RouterLink, HttpClientModule, CommonModule],
  templateUrl: './zone-a.component.html',
  styleUrl: './zone-a.component.scss'
})
export class ZoneAComponent implements OnInit {

booth:Booth[] = [];
zoneid: string = "";
// zoneId: string = "";

constructor(

  private dataService: DataService,
  private http: HttpClient,
  private router: Router,
  private route: ActivatedRoute
  // private route: ActivatedRoute
){}

ngOnInit(){
  this.route.queryParamMap.subscribe((params: any) => {
    this.zoneid = params.get('zoneID')
  });
  //  this.route.queryParamMap.subscribe((params: any) => {
  //   this.zoneId = params.get('zoneID');
  //  });
    this.getBooth();
}


getBooth(){
  let params = new HttpParams();

  params = params.set('zoneID', this.zoneid);
  // let params = new HttpParams();

  // params = params.set('zoneID', this.zoneId);

  // this.http.get(this.dataService.apiEndpoint + '/ShowGeneralBooth', { params }).subscribe((response: any) => {
  //   this.booth = response;
  //   console.log(this.booth);
    
  // })
  this.http.get(this.dataService.apiEndpoint + '/ShowGeneralBooth', { params }).subscribe((response: any) => {
    this.booth = response;
    console.log(this.booth);
    
  })
}
}
