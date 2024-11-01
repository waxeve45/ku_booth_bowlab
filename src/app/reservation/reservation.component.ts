// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
// import { DataService } from '../../data.service';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
// import Swal from 'sweetalert2';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-reservation',
//   standalone: true,
//   imports: [
//     FormsModule, 
//     RouterLink,
//     RouterModule,
//     HttpClientModule,
//     CommonModule,
//   ],
//   templateUrl: './reservation.component.html',
//   styleUrls: ['./reservation.component.scss'],
// })
// export class ReservationComponent implements OnInit {
//   selectedBooths: any[] = [];
//   boothItems: string[] = [];
//   payment_slip: string = '';
//   fname: string = '';
//   lname: string = '';
//   prefix: string = '';
//   userID: any;

//   constructor(
//     private dataService: DataService,
//     private http: HttpClient,
//     private router: Router,
//     private route: ActivatedRoute
//   ) {}

//   ngOnInit() {
//     const navigation = history.state;
//     this.selectedBooths = navigation.selectedBooths || [];
//     console.log('Booths selected:', this.selectedBooths);
    
//     const userData = sessionStorage.getItem('userData');
//     if (userData) {
//       const user = JSON.parse(userData);
//       this.userID = user.user_id;
//       this.fname = user.fname;
//       this.lname = user.lname;
//       this.prefix = user.prefix;
//     }
//     this.boothItems = new Array(this.selectedBooths.length).fill('');
//   }

//   coutPrice(): number {
//     return this.selectedBooths
//       .map((booth) => Number(booth.boothPrice))
//       .reduce((total, boothPrice) => total + boothPrice, 0);
//   }

//   onFileSelected(event: Event) {
//     const file = (event.target as HTMLInputElement).files?.[0];
//     if (file) {
//       this.payment_slip = file.name; // หรือสามารถใช้การอัปโหลดจริง
//     }
//   }

//   reserveBooth() {
//     if (this.boothItems.some((item) => !item)) {
//       Swal.fire({
//         title: 'ข้อมูลไม่ครบ',
//         text: 'กรุณาระบุสิ่งที่จะขายในบูธทั้งหมด',
//         icon: 'warning',
//         confirmButtonText: 'ตกลง'
//       });
//       return;
//     }

//     const reserData = this.selectedBooths.map((booth, index) => ({
//       boothID: booth.boothID,
//       userID: this.userID,
//       workID: booth.workID,
//       Product: this.boothItems[index],
//       ReservationStatus: 'จอง',
//       payment_slip: this.payment_slip || null,
//     }));

//     Swal.fire({
//       title: 'ยืนยันการจองบูธ',
//       text: 'คุณต้องการจองบูธนี้หรือไม่?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonText: 'ใช่, จองเลย!',
//       cancelButtonText: 'ยกเลิก'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         this.http.post(this.dataService.apiEndpoint + '/AddReserva', reserData).subscribe((response) => {
//           console.log('ข้อมูลการจอง:', reserData);
//           Swal.fire({
//             title: 'จองเรียบร้อย',
//             text: 'กดตกลงเพื่อไปยังรายการจอง',
//             icon: 'success',
//             confirmButtonText: 'ตกลง'
//           }).then((result) => {
//             if (result.isConfirmed) {
//               this.router.navigate(['listbooking']);
//             }
//           });
//         }, (error) => {
//           console.error('เกิดข้อผิดพลาด:', error);
//           Swal.fire({
//             title: 'เกิดข้อผิดพลาด',
//             text: 'มีข้อผิดพลาดในการจอง',
//             icon: 'error',
//             confirmButtonText: 'ตกลง'
//           });
//         });
//       } else {
//         console.log('การจองถูกยกเลิก');
//       }
//     });
//   }
// }
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
  orders = [{ id: 1 }];
  boothItems: string[] = [];
  payment_slip: File | null = null;
  fname: string = '';
  lname: string = '';
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
    return this.orders.reduce((total, order) => total + order.id, 0);
  }

  coutPrice(): number {
    return this.selectedBooths
      .map((booth) => Number(booth.boothPrice))
      .reduce((total, boothPrice) => total + boothPrice, 0);
  }

  // Handle file input change
  onFileSelected(event: any) {
    this.payment_slip = event.target.files[0];
  }

  reserveAll() {
    if (this.boothItems.some((item) => !item)) {
      console.log('ไม่สามารถจองได้ กรุณาระบุสินค้าที่ต้องการขาย');
      return;
    }

    if (this.selectedBooths.length === 0) {
      console.log('ไม่มีบูธที่เลือก');
      return;
    }

    const formData = new FormData();

    // Append reservation data
    this.selectedBooths.forEach((booth, index) => {
      formData.append(`reservations[${index}][boothID]`, booth.boothID);
      formData.append(`reservations[${index}][userID]`, this.userID);
      formData.append(`reservations[${index}][workID]`, booth.workID);
      formData.append(
        `reservations[${index}][Product]`,
        this.boothItems[index]
      );
      formData.append(`reservations[${index}][ReservationStatus]`, 'จอง');
    });

    // Append payment slip if available
    if (this.payment_slip) {
      formData.append('payment_slip', this.payment_slip);
    }

    console.log(this.payment_slip);
    console.log(formData);

    this.http
      .post(this.dataService.apiEndpoint + '/AddReserva', formData)
      .subscribe(
        () => {
          console.log('ข้อมูลการจองทั้งหมดถูกส่งไป:', formData);
          alert('จองบูธทั้งหมดเรียบร้อยแล้ว!');
        },
        (error) => {
          console.error('เกิดข้อผิดพลาดในการจอง:', error);
          alert('เกิดข้อผิดพลาดในการจองบูธ');
        }
      );
  }
}