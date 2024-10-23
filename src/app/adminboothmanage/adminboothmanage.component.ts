import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { DataService } from '../../data.service';
import { Booth } from '../model/boothmodel/booth.model';

@Component({
  selector: 'app-adminboothmanage',
  standalone: true,
  imports: [RouterLink, RouterModule, HttpClientModule, CommonModule, FormsModule],
  templateUrl: './adminboothmanage.component.html',
  styleUrls: ['./adminboothmanage.component.scss']
})
export class AdminboothmanageComponent implements OnInit {
  booths: Booth[] = [];
  loading: boolean = false;

  newBooth: Booth = {
    boothID: '',
    boothName: '',
    zoneID: '',
    boothSize: '',
    products_sold: '',
    boothPrice: '',
    boothStatus: ''
  };

  constructor(
    private http: HttpClient,
    private dataService: DataService,
  ) {}

  ngOnInit() {
    this.getAllBooths();
  }

  getAllBooths() {
    this.loading = true; // เริ่มโหลดข้อมูล
    this.http.get<Booth[]>(this.dataService.apiEndpoint + '/booth-get19').subscribe(
      (response) => {
        this.booths = response;
        this.loading = false; // โหลดข้อมูลเสร็จแล้ว
      },
      (error) => {
        console.error('Error fetching booths:', error);
        this.loading = false; // โหลดข้อมูลเสร็จแล้ว แม้จะมีข้อผิดพลาด
      }
    );
  }

  addOrUpdateBooth() {
    this.loading = true;
    console.log('Booth Data:', this.newBooth); // ตรวจสอบข้อมูลที่ส่ง

    const endpoint = this.newBooth.boothID ? '/booth-update' : '/booth-add';
    const method = this.newBooth.boothID ? this.http.put : this.http.post;

    method.call(this.http, this.dataService.apiEndpoint + endpoint, this.newBooth).subscribe({
        next: () => {
            Swal.fire(this.newBooth.boothID ? 'อัปเดตบูธสำเร็จ!' : 'เพิ่มบูธสำเร็จ!', this.newBooth.boothID ? 'บูธถูกอัปเดตเรียบร้อยแล้ว.' : 'บูธถูกเพิ่มเรียบร้อยแล้ว.', 'success');
            this.getAllBooths();
            this.resetBoothForm();
            this.loading = false;
        },
        error: (error) => {
            console.error('Error processing booth:', error);
            this.loading = false;
            Swal.fire('เกิดข้อผิดพลาด!', 'ไม่สามารถประมวลผลบูธได้ กรุณาลองใหม่อีกครั้ง.', 'error');
        }
    });
}

deleteBooth(boothID: string) {
  Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: 'คุณต้องการลบบูธนี้หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่, ลบเลย!',
      cancelButtonText: 'ยกเลิก'
  }).then((result) => {
      if (result.isConfirmed) {
          this.http.delete(this.dataService.apiEndpoint + '/deleteBooth/' + boothID)
              .subscribe({
                  next: () => {
                      Swal.fire('ลบสำเร็จ!', 'บูธถูกลบเรียบร้อยแล้ว.', 'success');
                      this.getAllBooths();
                  },
                  error: (error) => {
                      Swal.fire('ลบไม่สำเร็จ!', 'เกิดข้อผิดพลาดในการลบบูธ.', 'error');
                  }
              });
      }
  });
}


  editBooth(booth: Booth) {
    this.newBooth = { ...booth }; // คัดลอกข้อมูลของบูธที่เลือก
  }

  cancelEdit() {
    this.resetBoothForm();
  }

  resetBoothForm() {
    this.newBooth = { boothID: '', zoneID: '', boothName: '', boothSize: '', products_sold: '', boothPrice: '', boothStatus: '' };
  }
}
