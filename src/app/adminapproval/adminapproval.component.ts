import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-adminapproval',
  standalone: true,
  imports: [RouterLink,RouterModule,CommonModule],
  templateUrl: './adminapproval.component.html',
  styleUrl: './adminapproval.component.scss'
})
export class AdminapprovalComponent {
  
}
