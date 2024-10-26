import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { Booth } from '../model/boothmodel/booth.model';
import { DataService } from '../../data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [RouterLink, RouterModule, HttpClientModule, CommonModule],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent {
  selectedBooths: any[] = [];
  oders = [
    {id: 1},
  ]
  constructor(
    private dataService: DataService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const navigation = history.state;
    this.selectedBooths = navigation.selectedBooths || [];
    console.log(this.selectedBooths); 
  }
 cout():number{
   return this.oders.reduce((total, Count) => total + Count.id++, 0);
 }

 coutPrice(): number {
  return this.selectedBooths
  .map(booths => Number(booths.boothPrice))
  .reduce((total, boothPrice)=> total + boothPrice, 0)
  // return this.selectedBooths.reduce((total, booth) => total + booth.price );
}
}
