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

  eBooth: Booth = {
    boothID: '',
    boothName: '',
    zoneID: '',
    boothSize: '',
    products_sold: '',
    boothPrice: '',
    boothStatus: '',
    workID: '',
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
    this.http.get(this.dataService.apiEndpoint + '/booth-get19').subscribe(
      (response : any) => {
        this.booths = response;
        this.loading = false; // โหลดข้อมูลเสร็จแล้ว
      }
    );
  }

  addOrUpdateBooth() {
    this.loading = true;
    console.log(this.eBooth);

    if (this.eBooth.boothID) {
        this.updateBooth();
    } else {
        this.addBooth();
    }
}

addBooth() {
    this.http.post(this.dataService.apiEndpoint + '/booth-add', this.eBooth).subscribe({
        next: () => {
            Swal.fire('เพิ่มบูธสำเร็จ!', 'บูธถูกเพิ่มเรียบร้อยแล้ว.', 'success');
            this.getAllBooths();
            this.resetBoothForm();
            this.loading = false;
        },
        error: (error) => {
            console.error('Error adding booth:', error);
            this.loading = false;
        }
    });
}

updateBooth() {
    this.http.put(this.dataService.apiEndpoint + '/booth-update', this.eBooth).subscribe({
        next: () => {
            Swal.fire('อัปเดตบูธสำเร็จ!', 'บูธถูกอัปเดตเรียบร้อยแล้ว.', 'success');
            this.getAllBooths();
            this.resetBoothForm();
            this.loading = false;
        },
        error: (error) => {
            console.error('Error updating booth:', error);
            this.loading = false;
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
    this.eBooth = { ...booth }; // คัดลอกข้อมูลของบูธที่เลือก
  }

  cancelEdit() {
    this.resetBoothForm();
  }

  resetBoothForm() {
    this.eBooth = { boothID: '', zoneID: '', boothName: '', boothSize: '', products_sold: '', boothPrice: '', boothStatus: '',workID: '' };
  }
}
