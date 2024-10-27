import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { ReservationBooth } from '../model/reservation/reserveshow.model';


@Component({
  selector: 'app-listbooking',
  standalone: true,
  imports: [RouterLink, HttpClientModule, CommonModule],
  templateUrl: './listbooking.component.html',
  styleUrl: './listbooking.component.scss',
})
export class ListbookingComponent {
  selectedBooths: any[] = [];
  boothItems: ReservationBooth[] = [];
  userID: any;

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
      });
  }

  calculateTotalPrice(boothDetails: any[]): number {
    return boothDetails.reduce((sum, booth) => sum + booth.boothPrice, 0);
  }
}