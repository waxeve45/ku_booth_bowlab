import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { ReservationBooth } from '../model/reservation/reservationBooth.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listbooking',
  standalone: true,
  imports: [RouterLink, HttpClientModule, CommonModule],
  templateUrl: './listbooking.component.html',
  styleUrl: './listbooking.component.scss',
})
export class ListbookingComponent implements OnInit {
  selectedBooths: any[] = [];
  boothItems: ReservationBooth[] = [];
  userID: any;
  reservId: any = '';
  messageNotPayment: string = '';

  constructor(
    private dataService: DataService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const userData = sessionStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      this.userID = user.user_id;
      this.getAllReserve();
    }
  }

  getAllReserve() {
    this.http
      .get(`${this.dataService.apiEndpoint}/ShowReser/${this.userID}`)
      .subscribe((data: any) => {
        this.boothItems = data.map((item: any) => ({
          ...item,
          totalPrice: this.calculateTotalPrice(item.boothDetails),
        }));
        console.log(this.boothItems);

        this.boothItems.forEach((item: any) => {
          // if (item.ReservationStatus !== 'paid') {
          this.checkDateForPayment(item.reservationID, item.work_date_Start);
          // }
        });

        if (this.boothItems.length > 0) {
          this.reservId = this.boothItems.map(
            (item: any) => item.reservationID
          );
          console.log(this.reservId);
        }
      });
  }

  calculateTotalPrice(boothDetails: any[]): number {
    return boothDetails.reduce((sum, booth) => sum + booth.boothPrice, 0);
  }

  checkDateForPayment(reservationID: string, workDate: string) {
    const jsonData = {
      reservationID: reservationID,
      workDate: workDate,
    };

    console.log(jsonData);

    this.http
      .post(`${this.dataService.apiEndpoint}/check-date`, jsonData)
      .subscribe(
        (response: any) => {
          if (response.message === 'ชำระเงินไม่ได้') {
            // alert('ไม่สามารถชำระเงินได้เนื่องจากเวลาที่เหลือน้อยกว่า 5 วัน');
            this.messageNotPayment = response.message;
            console.log('สถานะชำระเงิน' + this.messageNotPayment);
          } else {
            this.messageNotPayment = response.message;
            console.log('สถานะชำระเงิน' + this.messageNotPayment);
            // alert('สามารถชำระเงินได้');
          }
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }
  cancelAllReservations(reservationID: any) {
    const cancelReservation = (id: any) => {
      this.http
        .post(`${this.dataService.apiEndpoint}/CancelReserva/${id}`, {})
        .subscribe(
          (response: any) => {
            if (response.messages === 'Cancellation Successful') {
              console.log(`Reservation ${id} cancelled successfully`);
              Swal.fire({
                icon: 'success',
                title: 'ยกเลิกสำเร็จ!',
                text: `การจองยกเลิกเรียบร้อยแล้ว`,
              });
            } else {
              console.log(`Failed to cancel reservation ${id}`);
              Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด!',
                text: `ไม่สามารถยกเลิกการจองได้ กรุณาลองใหม่อีกครั้ง`,
              });
            }
          },
          (error) => {
            console.error(`Error cancelling reservation ${id}:`, error);
            Swal.fire({
              icon: 'error',
              title: 'เกิดข้อผิดพลาด!',
              text: `ไม่สามารถยกเลิกการจอง: ${error.message}`,
            });
          }
        );
    };
  
    if (Array.isArray(reservationID)) {
      reservationID.forEach((id) => {
        if (typeof id === 'number' || typeof id === 'string') {
          Swal.fire({
            title: 'ยืนยันการยกเลิก',
            text: `คุณต้องการยกเลิกการจองหรือไม่?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'ใช่, ยกเลิก!',
            cancelButtonText: 'ไม่, ยกเลิก!',
          }).then((result) => {
            if (result.isConfirmed) {
              cancelReservation(id);
            }
          });
        } else {
          console.error(`Invalid reservationID: ${id}`);
        }
      });
    } else if (typeof reservationID === 'number' || typeof reservationID === 'string') {
      Swal.fire({
        title: 'ยืนยันการยกเลิก',
        text: `คุณต้องการยกเลิกการจองหรือไม่?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'ใช่, ยกเลิก!',
        cancelButtonText: 'ไม่, ยกเลิก!',
      }).then((result) => {
        if (result.isConfirmed) {
          cancelReservation(reservationID);
        }
      });
    } else {
      console.error(`Invalid reservationID: ${reservationID}`);
    }
  
    this.getAllReserve();
  }

  paymentForBooth(reservationIDs: any) {
    if (Array.isArray(reservationIDs) && reservationIDs.length > 0) {
      const queryParams = {
        reservationIDs: reservationIDs,
      };

      console.log(queryParams);

      this.router.navigate(['/reservation'], { queryParams });
    } else if (
      typeof reservationIDs === 'number' ||
      typeof reservationIDs === 'string'
    ) {
      const queryParams = {
        reservationIDs: [reservationIDs],
      };

      console.log(queryParams);

      this.router.navigate(['/reservation'], { queryParams });
    } else {
      console.error(`Invalid reservationID: ${reservationIDs}`);
    }
  }
}