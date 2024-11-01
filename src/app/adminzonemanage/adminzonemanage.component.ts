import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Zone } from '../model/zonemodel/zone.model';
import { DataService } from '../../data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adminzonemanage',
  standalone: true,
  imports: [RouterLink, RouterModule, HttpClientModule, CommonModule, FormsModule],
  templateUrl: './adminzonemanage.component.html',
  styleUrls: ['./adminzonemanage.component.scss']
})
export class AdminzonemanageComponent implements OnInit {
[x: string]: any;
  zones: Zone[] = [];
  editingZone: Zone | null = null; // เก็บข้อมูลโซนที่กำลังแก้ไข
  isEditing: boolean = false; // flag สำหรับการแสดงฟอร์มแก้ไข
  newZone: Zone; // สำหรับเก็บข้อมูลโซนใหม่

  constructor(
    private dataService: DataService,
    private http: HttpClient,
    private router: Router,
  ) {
    // กำหนดค่าเริ่มต้นสำหรับ newZone ใน constructor
    this.newZone = {products_sold: '', zoneID: '', zoneName: '', Number_of_booths: '', workID: '' };
  }

  ngOnInit() {
    this.getAllZone();
  }

  getAllZone() {
    this.http.get(this.dataService.apiEndpoint + '/showzone16').subscribe((response: any) => {
      this.zones = response;
    });
  }

  // เริ่มการแก้ไขโซน
  startEditZone(zone: Zone) {
    this.editingZone = { ...zone }; // clone object เพื่อหลีกเลี่ยงการแก้ไขโดยตรง
    this.isEditing = true;
  }

  // ยกเลิกการแก้ไข
  cancelEdit() {
    this.editingZone = null;
    this.isEditing = false;
  }

  // บันทึกข้อมูลที่แก้ไข
  saveEdit() {
    if (this.editingZone) {
      this.http.post(this.dataService.apiEndpoint + '/updatezone16', this.editingZone)
        .subscribe({
          next: () => {
            Swal.fire({
              title: 'อัปเดตโซนสำเร็จ!',
              text: 'โซนถูกอัปเดตเรียบร้อยแล้ว.',
              icon: 'success',
              confirmButtonText: 'ตกลง'
            });
            this.getAllZone(); // โหลดข้อมูลใหม่หลังจากแก้ไข
            this.cancelEdit(); // ยกเลิกโหมดการแก้ไข
          },
          error: (error) => {
            console.error('Error updating zone:', error);
            Swal.fire({
              title: 'เกิดข้อผิดพลาด!',
              text: 'ไม่สามารถอัปเดตโซนได้ กรุณาลองใหม่อีกครั้ง.',
              icon: 'error',
              confirmButtonText: 'ตกลง'
            });
          }
        });
    }
  }
  

  // ลบโซน
  deleteZone(zoneID: string) {
    Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: 'คุณต้องการลบโซนนี้หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่, ลบเลย!',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(this.dataService.apiEndpoint + '/deleteZones18/' + zoneID)
          .subscribe({
            next: () => {
              Swal.fire(
                'ลบสำเร็จ!',
                'โซนถูกลบเรียบร้อยแล้ว.',
                'success'
              );
              this.getAllZone(); // โหลดข้อมูลใหม่หลังจากลบ
            },
            error: (error) => {
              console.error('Error deleting zone:', error);
              Swal.fire(
                'ลบไม่สำเร็จ!',
                'เกิดข้อผิดพลาดในการลบโซน.',
                'error'
              );
            }
          });
      }
    });
  }
  

  // ฟังก์ชันสำหรับเพิ่มโซนใหม่
  addZones() {
    this.http.post(this.dataService.apiEndpoint + '/addzoneadmin16', this.newZone)
      .subscribe({
        next: () => {
          Swal.fire({
            title: 'เพิ่มโซนสำเร็จ!',
            text: 'โซนใหม่ถูกเพิ่มเรียบร้อยแล้ว.',
            icon: 'success',
            confirmButtonText: 'ตกลง'
          });
          this.getAllZone(); // โหลดข้อมูลใหม่หลังจากเพิ่มโซน
          this.resetNewZone(); // รีเซ็ตข้อมูลโซนใหม่
        },
        error: (error) => {
          console.error('Error adding zone:', error);
          Swal.fire({
            title: 'เกิดข้อผิดพลาด!',
            text: 'ไม่สามารถเพิ่มโซนได้ กรุณาลองใหม่อีกครั้ง.',
            icon: 'error',
            confirmButtonText: 'ตกลง'
          });
        }
      });
  }
  

  // ฟังก์ชันสำหรับรีเซ็ตข้อมูลโซนใหม่
  resetNewZone() {
    this.newZone = {products_sold: '', zoneID: '', zoneName: '', Number_of_booths: '', workID: '' };
  }
}
