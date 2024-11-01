import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { DataService } from '../../data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    FormsModule, 
    RouterLink,
    RouterModule,
    HttpClientModule,
    CommonModule,
  ],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
})
export class ReservationComponent implements OnInit {
  selectedBooths: any[] = [];
  boothItems: string[] = [];
  payment_slip: string = '';
  fname: string = '';
  lname: string = '';
  prefix: string = '';
  userID: any;

  constructor(
    private dataService: DataService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const navigation = history.state;
    this.selectedBooths = navigation.selectedBooths || [];
    console.log('Booths selected:', this.selectedBooths);
    
    const userData = sessionStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      this.userID = user.user_id;
      this.fname = user.fname;
      this.lname = user.lname;
      this.prefix = user.prefix;
    }
    this.boothItems = new Array(this.selectedBooths.length).fill('');
  }

  coutPrice(): number {
    return this.selectedBooths
      .map((booth) => Number(booth.boothPrice))
      .reduce((total, boothPrice) => total + boothPrice, 0);
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.payment_slip = file.name; // หรือสามารถใช้การอัปโหลดจริง
    }
  }

  reserveBooth() {
    if (this.boothItems.some((item) => !item)) {
      Swal.fire({
        title: 'ข้อมูลไม่ครบ',
        text: 'กรุณาระบุสิ่งที่จะขายในบูธทั้งหมด',
        icon: 'warning',
        confirmButtonText: 'ตกลง'
      });
      return;
    }

    const reserData = this.selectedBooths.map((booth, index) => ({
      boothID: booth.boothID,
      userID: this.userID,
      workID: booth.workID,
      Product: this.boothItems[index],
      ReservationStatus: 'จอง',
      payment_slip: this.payment_slip || null,
    }));

    Swal.fire({
      title: 'ยืนยันการจองบูธ',
      text: 'คุณต้องการจองบูธนี้หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่, จองเลย!',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.post(this.dataService.apiEndpoint + '/AddReserva', reserData).subscribe((response) => {
          console.log('ข้อมูลการจอง:', reserData);
          Swal.fire({
            title: 'จองเรียบร้อย',
            text: 'กดตกลงเพื่อไปยังรายการจอง',
            icon: 'success',
            confirmButtonText: 'ตกลง'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['listbooking']);
            }
          });
        }, (error) => {
          console.error('เกิดข้อผิดพลาด:', error);
          Swal.fire({
            title: 'เกิดข้อผิดพลาด',
            text: 'มีข้อผิดพลาดในการจอง',
            icon: 'error',
            confirmButtonText: 'ตกลง'
          });
        });
      } else {
        console.log('การจองถูกยกเลิก');
      }
    });
  }
}
