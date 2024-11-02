// import { Component, OnInit } from '@angular/core';
// import {
//   ActivatedRoute,
//   Router,
//   RouterLink,
//   RouterModule,
// } from '@angular/router';
// import { Booth } from '../model/boothmodel/booth.model';
// import { DataService } from '../../data.service';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-reservation',
//   standalone: true,
//   imports: [
//     RouterLink,
//     RouterModule,
//     HttpClientModule,
//     CommonModule,
//     FormsModule,
//   ],
//   templateUrl: './reservation.component.html',
//   styleUrls: ['./reservation.component.scss'],
// })
// export class ReservationComponent implements OnInit {
//   selectedBooths: any[] = [];
//   oders = [{ id: 1 }];
//   bootID: any;
//   userID: any;
//   boothItems: string[] = [];
//   payment_slip: string = '';
//   fname: string = '';
//   lname: string = '';

//   constructor(
//     private dataService: DataService,
//     private http: HttpClient,
//     private router: Router,
//     private route: ActivatedRoute
//   ) {}

//   ngOnInit() {
//     const navigation = history.state;
//     this.selectedBooths = navigation.selectedBooths || [];
//     console.log('Booths selected: ', this.selectedBooths);
//     const userData = sessionStorage.getItem('userData');
//     if (userData) {
//       const user = JSON.parse(userData);
//       this.userID = user.user_id;
//       this.fname = user.fname;
//       this.lname = user.lname;
//     }
//     this.boothItems = new Array(this.selectedBooths.length).fill('');
//   }

//   cout(): number {
//     return this.oders.reduce((total, order) => total + order.id, 0);
//   }

//   coutPrice(): number {
//     return this.selectedBooths
//       .map((booth) => Number(booth.boothPrice))
//       .reduce((total, boothPrice) => total + boothPrice, 0);
//   }

//   reserveBooth() {
//     if (this.boothItems.some((item) => !item)) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'ไม่สามารถจองได้',
//         text: 'กรุณาระบุของที่จะขาย',
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
  
//     this.http.post(this.dataService.apiEndpoint + '/AddReserva1', reserData).subscribe(
//       (response) => {
//         console.log('ข้อมูลการจอง:', reserData);
//         Swal.fire({
//           icon: 'success',
//           title: 'จองเรียบร้อย',
//           text: 'ข้อมูลการจองของคุณถูกบันทึกแล้ว',
//         }).then(() => {
//           this.router.navigate(['listbooking']);
//         });
//       },
//       (error) => {
//         console.error('เกิดข้อผิดพลาด:', error);
//         Swal.fire({
//           icon: 'error',
//           title: 'เกิดข้อผิดพลาด',
//           text: 'เกิดข้อผิดพลาดในการจอง',
//         }).then(() => {
//           this.router.navigate(['listbooking']);
//         });
//       }
//     );
//   }
  
// }

import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import { DataService } from '../../data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservationBoothForPayment } from '../model/reservation/reservation-for-payment.model';
import Swal from 'sweetalert2';

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
  boothItems: string[] = [];
  payment_slip: File | null = null;
  fname: string = '';
  lname: string = '';
  userID: any;
  reservationIDs: string[] = [];
  reservations: ReservationBoothForPayment[] = [];
  totalPrice: number = 0;

  constructor(
    private dataService: DataService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params: any) => {
      this.reservationIDs = params.getAll('reservationIDs'); // This will return an array
      console.log('log param:', this.reservationIDs);

      if (this.reservationIDs.length > 0) {
        this.getAllReservation();
      }
    });

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

  getAllReservation() {
    const ids = this.reservationIDs.join(','); // Join IDs into a comma-separated string
    this.http
      .get<ReservationBoothForPayment[]>(
        `${this.dataService.apiEndpoint}/showReservation/${ids}`
      )
      .subscribe(
        (data) => {
          this.reservations = data; // Assign the response data to reservations
          console.log('Reservations:', this.reservations);
          this.totalPrice = this.coutPriceForGetReservation();
        },
        (error) => {
          console.error('Error fetching reservations:', error);
        }
      );
  }

  coutPriceForGetReservation(): number {
    return this.reservations
      .map((reservation) => Number(reservation.boothPrice))
      .reduce((total, boothPrice) => total + boothPrice, 0);
  }

  coutPrice(): number {
    return this.selectedBooths
      .map((booth) => Number(booth.boothPrice))
      .reduce((total, boothPrice) => total + boothPrice, 0);
  }

  onFileSelected(event: any) {
    this.payment_slip = event.target.files[0];
  }

  reserveAll() {
    if (this.boothItems.some((item) => !item)) {
      console.error('Cannot reserve: Please specify products for all booths.');
      alert('ไม่สามารถจองได้ กรุณาระบุสินค้าที่ต้องการขาย');
      return;
    }

    if (this.selectedBooths.length === 0) {
      console.error('No booths selected');
      alert('ไม่มีบูธที่เลือก');
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

    console.log('Logging FormData contents:');
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    this.http
      .post(this.dataService.apiEndpoint + '/AddReserva', formData)
      .subscribe(
        () => {
          console.log('Reservation data successfully sent:', formData);

          Swal.fire({
            title: 'จองบูธสำเร็จ',
            text: 'คุณได้ทำการจองบูธสำเร็จ',
            icon: 'success',
          });
          this.router.navigate(['listbooking']);
        },
        (error) => {
          console.error('Error during reservation:', error);
          alert('เกิดข้อผิดพลาดในการจองบูธ');
        }
      );
  }
}
