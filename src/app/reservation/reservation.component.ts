import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent {
  selectedBooths: any[] = [];

  constructor() {
    const navigation = history.state;
    this.selectedBooths = navigation.selectedBooths || [];
    console.log(this.selectedBooths); // ดูข้อมูลบูธที่ถูกเลือกในคอนโซล
  }
}
