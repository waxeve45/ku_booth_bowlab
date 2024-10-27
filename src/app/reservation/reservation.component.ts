import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import { Booth } from '../model/boothmodel/booth.model';
import { DataService } from '../../data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    RouterLink,
    RouterModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
})
export class ReservationComponent implements OnInit {
  selectedBooths: any[] = [];
  oders = [{ id: 1 }];
  bootID: any;
  userID: any;
  boothItems: string[] = [];
  payment_slip: string = '';
  fname: string = '';
  lname: string = '';

  constructor(
    private dataService: DataService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const navigation = history.state;
    this.selectedBooths = navigation.selectedBooths || [];
    console.log('Booths selected: ', this.selectedBooths);
    const userData = sessionStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      this.userID = user.user_id;
      this.fname = user.fname;
      this.lname = user.lname;
    }
    this.boothItems = new Array(this.selectedBooths.length).fill('');
  }

  cout(): number {
    return this.oders.reduce((total, order) => total + order.id, 0);
  }

  coutPrice(): number {
    return this.selectedBooths
      .map((booth) => Number(booth.boothPrice))
      .reduce((total, boothPrice) => total + boothPrice, 0);
  }

  reserveBooth(){
    if(this.boothItems.some((item)=> !item)){
      console.log('ไม่สามารถจองได้ กรุณาระบุของที่จะขาย');
      return;
    }
    const reserData = this.selectedBooths.map((booth, index)=>({
      boothID: booth.boothID,
      userID: this.userID,
      workID: booth.workID,
      Product: this.boothItems[index],
      ReservationStatus: 'จอง',
      payment_slip: this.payment_slip || null,
    }));
    this.http.post(this.dataService.apiEndpoint + '/AddReserva', reserData).subscribe((response)=>{
      console.log('ข้อมูลการจอง:',reserData);
      alert ('จองเรียบร้อย');
      
    },(error)=>{
      console.error('เกิดข้อผิดพลาด:',error);
      alert('เกิดข้อผิดพลาดในการจอง');
    }
  ); 
 }
}
