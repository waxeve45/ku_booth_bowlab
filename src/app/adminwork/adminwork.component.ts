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
  imports: [RouterLink, RouterModule, CommonModule, HttpClientModule, FormsModule],  // เพิ่ม FormsModule
  templateUrl: './adminwork.component.html',
  styleUrls: ['./adminwork.component.scss']
})
export class AdminworkComponent implements OnInit {
  // ข้อมูลงาน
  works: Work[] = [];
  currentWork: Work = { workID: '', workCode: '', workName: '', work_date_Start: '', work_date_End: '' };
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
    this.http.get<Work[]>(`${this.dataService.apiEndpoint}/getWork`).subscribe(
      (response) => {
        console.log(response); // เพิ่มการ log ข้อมูลที่ดึงมา
        this.works = response;
      },
      (error) => {
        console.error('Error fetching work data', error);
      }
    );
  }
  

  // เพิ่มงานใหม่
  addWork() {
    this.http.post(`${this.dataService.apiEndpoint}/add14`, this.currentWork).subscribe(
      () => {
        Swal.fire({
          title: 'เพิ่มงานสำเร็จ!',
          text: 'งานถูกเพิ่มเรียบร้อยแล้ว.',
          icon: 'success',
          confirmButtonText: 'ตกลง'
        });
        this.resetForm(); // รีเซ็ตฟอร์มหลังจากเพิ่มงาน
        this.getWork(); // โหลดข้อมูลใหม่
      },
      (error) => {
        console.error('Error adding work', error);
        Swal.fire({
          title: 'เพิ่มงานไม่สำเร็จ!',
          text: 'เกิดข้อผิดพลาดในการเพิ่มงาน.',
          icon: 'error',
          confirmButtonText: 'ตกลง'
        });
      }
    );
  }
  

  // แสดงข้อมูลในฟอร์มเพื่อแก้ไข
  populateForm(work: Work) {
    this.currentWork = { ...work };
    this.isEditing = true;
  }

  // อัปเดตงาน
  updateWork() {
    if (this.currentWork.workID) {  // ตรวจสอบว่า workID มีค่า
      this.http.post(`${this.dataService.apiEndpoint}/update14`, this.currentWork).subscribe(
        (response: any) => {
          if (response.message === 'Update successful') {
            Swal.fire({
              title: 'อัปเดตงานสำเร็จ!',
              text: 'งานถูกอัปเดตเรียบร้อยแล้ว.',
              icon: 'success',
              confirmButtonText: 'ตกลง'
            });
            this.resetForm(); // รีเซ็ตฟอร์มหลังจากอัปเดตงาน
            this.getWork(); // โหลดข้อมูลใหม่
          } else {
            Swal.fire({
              title: 'ไม่สำเร็จ!',
              text: response.message,
              icon: 'warning',
              confirmButtonText: 'ตกลง'
            });
          }
        },
        (error) => {
          console.error('Error updating work', error);
          Swal.fire({
            title: 'เกิดข้อผิดพลาดในการอัปเดต!',
            text: 'กรุณาลองใหม่อีกครั้ง.',
            icon: 'error',
            confirmButtonText: 'ตกลง'
          });
        }
      );
    } else {
      Swal.fire({
        title: 'ไม่พบ ID งาน!',
        text: 'ไม่สามารถอัปเดตงานได้.',
        icon: 'warning',
        confirmButtonText: 'ตกลง'
      });
    }
  }
  
  

  // ลบงาน
// ลบงาน (ใช้ workID แทน workCode)
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
      this.http.delete(`${this.dataService.apiEndpoint}/deleteWork/${workID}`).subscribe(
        () => {
          Swal.fire(
            'ลบสำเร็จ!',
            'งานถูกลบเรียบร้อยแล้ว.',
            'success'
          );
          this.getWork(); // โหลดข้อมูลใหม่หลังจากลบ
        },
        (error) => {
          console.error('Error deleting work', error);
          Swal.fire(
            'ลบไม่สำเร็จ!',
            'เกิดข้อผิดพลาดในการลบงาน.',
            'error'
          );
        }
      );
    }
  });
}


  // รีเซ็ตฟอร์ม
  resetForm() {
    this.currentWork = { workID: '', workCode: '', workName: '', work_date_Start: '', work_date_End: '' };
    this.isEditing = false;
  }
}
