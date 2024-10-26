import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listbooking',
  standalone: true,
  imports: [RouterLink, HttpClientModule, CommonModule],
  templateUrl: './listbooking.component.html',
  styleUrl: './listbooking.component.scss'
})
export class ListbookingComponent {

}
