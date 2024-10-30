import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { ReservationBooth } from '../model/reservation/reservationBooth.model';


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
}