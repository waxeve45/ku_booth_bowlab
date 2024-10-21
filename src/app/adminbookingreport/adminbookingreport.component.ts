import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { Reservation, PaidReservationElement } from '../model/reservation/reservation.model';
import { DataService } from '../../data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adminbookingreport',
  standalone: true,
  imports: [RouterLink, RouterModule, HttpClientModule, CommonModule],
  templateUrl: './adminbookingreport.component.html',
  styleUrls: ['./adminbookingreport.component.scss']
})
export class AdminbookingreportComponent {
  unpaidReservations: PaidReservationElement[] = [];
  paidReservations: PaidReservationElement[] = [];
  pendingReservations: PaidReservationElement[] = [];

  constructor(
    private dataService: DataService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getreservation();
  }

  getreservation() {
    this.http.get<Reservation>(this.dataService.apiEndpoint + '/showAllReservations').subscribe((response: Reservation) => {
      this.unpaidReservations = response.unpaid_reservations;
      this.paidReservations = response.paid_reservations;
      this.pendingReservations = response.under_review_reservations;
    });
  }
}