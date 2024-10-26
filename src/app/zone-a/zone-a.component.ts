import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Booth } from '../model/boothmodel/booth.model';
import { DataService } from '../../data.service';
import { User } from '../model/usermodel/user.model';
import { CheckReserv, Convert } from '../model/reservation/check-reserv.model';

@Component({
  selector: 'app-zone-a',
  standalone: true,
  imports: [RouterLink, HttpClientModule, CommonModule],
  templateUrl: './zone-a.component.html',
  styleUrls: ['./zone-a.component.scss'],
})
export class ZoneAComponent implements OnInit {
  booth: Booth[] = [];
  selectedBoothList: Booth[] = [];
  zoneid: string = '';
  selectedBooths: number = 0;
  maxSelectedBooths: number = 4;
  userId = '';
  users: User[] = [];
  checkReserv: CheckReserv = { count: 0, message: '' };

  messageError: string = '';
  countReserv: number = 0;
  checkCount:number = 0;
  constructor(
    private dataService: DataService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params: any) => {
      this.zoneid = params.get('zoneID');
    });
    const userData = sessionStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      this.userId = user.user_id;
      console.log(this.userId);
      this.coutReserv();
    }
    this.getBooth();
  }

  getBooth() {
    let params = new HttpParams();
    params = params.set('zoneID', this.zoneid);

    this.http
      .get(this.dataService.apiEndpoint + '/ShowGeneralBooth', { params })
      .subscribe((response: any) => {
        this.booth = response;
        console.log(this.booth);
      });
  }

  coutReserv() {
    this.http.get(this.dataService.apiEndpoint + '/checkReserva/' + this.userId).subscribe(
        (response: any) => {
          this.checkReserv = Convert.toCheckReserv(JSON.stringify(response));
          if (this.checkReserv.count >= 4) {
            this.countReserv = this.checkReserv.count;
            console.log('ไม่สามารถจองบูธเพิ่มได้');
          } else {
            this.messageError = this.checkReserv.message;
            console.log(this.checkReserv.message);
          }
        },
        (error) => {
          console.error('Error fetching reservations:', error);
        }
      );
  }
  reserBoothSelect(event: any, selectedBooth: Booth) {
    this.countReserv = this.checkReserv.count;
    this.checkCount = this.maxSelectedBooths - this.countReserv;
    console.log(this.checkCount);
    this.countReserv = this.checkReserv.count;
    

    if (event.target.checked) {
      if (this.selectedBooths < this.maxSelectedBooths &&
        this.selectedBooths < this.checkCount
      ){
        this.selectedBooths++;
        this.selectedBoothList.push(selectedBooth);
      } else {
        event.target.checked = false;
      }
    } else {
      this.selectedBooths--;
      this.selectedBoothList = this.selectedBoothList.filter(
        (booth) => booth.boothID !== selectedBooth.boothID
      );
    }
  }

  reserveBooths() {
    this.router.navigate(['/reservation'], {
      state: { selectedBooths: this.selectedBoothList },
    });
  }
}