import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Booth } from '../model/boothmodel/booth.model';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-zone-a',
  standalone: true,
  imports: [RouterLink, HttpClientModule, CommonModule],
  templateUrl: './zone-a.component.html',
  styleUrls: ['./zone-a.component.scss']
})
export class ZoneAComponent implements OnInit {
  booth: Booth[] = [];
  selectedBoothList: Booth[] = [];
  zoneid: string = "";
  selectedBooths: number = 0;
  maxSelectedBooths: number = 4;

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
    this.getBooth();
  }

  getBooth() {
    let params = new HttpParams();
    params = params.set('zoneID', this.zoneid);

    this.http.get(this.dataService.apiEndpoint + '/ShowGeneralBooth', { params }).subscribe((response: any) => {
      this.booth = response;
      console.log(this.booth);
    });
  }

  reserBoothSelect(event: any, selectedBooth: Booth) {
    if (event.target.checked) {
      if (this.selectedBooths < this.maxSelectedBooths) {
        this.selectedBooths++;
        this.selectedBoothList.push(selectedBooth);
      } else {
        event.target.checked = false;
      }
    } else {
      this.selectedBooths--;
      this.selectedBoothList = this.selectedBoothList.filter(booth => booth.boothID !== selectedBooth.boothID);
    }
  }

  reserveBooths() {
    this.router.navigate(['/reservation'], { state: { selectedBooths: this.selectedBoothList } });
  }
}
