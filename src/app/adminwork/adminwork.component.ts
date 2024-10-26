import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { DataService } from '../../data.service';
import { Work } from '../model/workmodel/work.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adminwork',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule, HttpClientModule, FormsModule], 
  templateUrl: './adminwork.component.html',
  styleUrls: ['./adminwork.component.scss']
})
export class AdminworkComponent implements OnInit {

  works: Work[] = [];
  currentWork: Work = { workID: '' , workName: '', work_date_Start: '', work_date_End: '' };
  isEditing: boolean = false;

  constructor(
    private dataService: DataService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.getWork();
  }

  // ดึงข้อมูลการจัดงานทั้งหมด
  getWork() {
    this.http.get(this.dataService.apiEndpoint + '/getWork' + this.works).subscribe(
      (response: any) => {
        console.log(response);
        this.works = response;
      }
    );
  }
  
  // เพิ่มงานใหม่
  addWork() {
    this.http.post(this.dataService.apiEndpoint + '/add14', this.currentWork).subscribe(
      (response: any) => {
        console.log(response);
        Swal.fire({
          title: 'เพิ่มงานสำเร็จ!',
          text: 'งานถูกเพิ่มเรียบร้อยแล้ว.',
          icon: 'success',
          confirmButtonText: 'ตกลง'
        }).then(() => {
          location.reload(); 
        });
        this.resetForm();
        this.getWork(); 
      }
    );
  }
  

  populateForm(work: Work) {
    this.currentWork = { ...work };
    this.isEditing = true;
  }

  // อัปเดตงาน
  updateWork() {
    if (this.currentWork.workID) {
      this.http.post(this.dataService.apiEndpoint + '/update14', this.currentWork).subscribe(
        (response: any) => {
          if (response.message === 'Update successful') {
            Swal.fire({
              title: 'อัปเดตงานสำเร็จ!',
              text: 'งานถูกอัปเดตเรียบร้อยแล้ว.',
              icon: 'success',
              confirmButtonText: 'ตกลง'
            }).then(() => {
              location.reload(); 
            });
            this.resetForm(); 
            this.getWork(); 
          } 
        }
      );
    } 
  }
  
  

  // ลบงาน
  deleteWork(workID: string) {
    Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: 'คุณต้องการลบงานนี้หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่, ลบเลย!',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(this.dataService.apiEndpoint + '/deleteWork/' + workID).subscribe(
          () => {
            Swal.fire(
              'ลบสำเร็จ!',
              'งานถูกลบเรียบร้อยแล้ว.',
              'success'
            ).then(() => {
              location.reload(); 
            });      
            this.getWork(); 
          });
      }
    });
  }  


  // ฟอร์มยกเลิก
  resetForm() {
    this.currentWork = { workID: '', workName: '', work_date_Start: '', work_date_End: '' };
    this.isEditing = false;
  }
}
