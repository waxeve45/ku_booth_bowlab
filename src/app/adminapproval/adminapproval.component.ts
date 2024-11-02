import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { StatusReser } from '../model/reservation/statusreser.model';
import { DataService } from '../../data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { User } from '../model/usermodel/user.model';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adminapproval',
  standalone: true,
  imports: [RouterLink, RouterModule, HttpClientModule, CommonModule, FormsModule],
  templateUrl: './adminapproval.component.html',
  styleUrls: ['./adminapproval.component.scss']  // แก้ไขเป็น styleUrls
})
export class AdminapprovalComponent {
  statusreser: StatusReser[] = [];
  user: User[] = [];

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getStatus();
  }

  getStatus() {
    this.http.get(this.dataService.apiEndpoint + '/status22222').subscribe((response: any) => {  // แก้ไข URL ให้ถูกต้อง
      this.statusreser = response;
    });
  }

  approve(reservationID: string) {
    this.http.post(this.dataService.apiEndpoint + '/UpdateReServation22/' + reservationID, {}).subscribe(
      (response: any) => {
        // แสดงข้อความเมื่ออนุมัติสำเร็จ
        Swal.fire({
          icon: 'success',
          title: 'อนุมัติเสร็จสิ้น',
          text: 'การอนุมัติการจองสำเร็จแล้ว!',
          confirmButtonText: 'ตกลง'
        });
      },
      (error) => {
        // แสดงข้อความเมื่อเกิดข้อผิดพลาด
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาดในการอนุมัติ',
          text: 'โปรดลองอีกครั้ง!',
          confirmButtonText: 'ตกลง'
        });
        console.error('เกิดข้อผิดพลาดในการอนุมัติ:', error);
      }
    );
  }
}
