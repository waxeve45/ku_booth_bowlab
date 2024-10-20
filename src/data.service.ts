import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Zone } from './app/model/zonemodel/zone.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiEndpoint = "http://localhost/api_booth_csc";

  constructor(
    private http: HttpClient,
    private router: Router,
    private dataService: DataService
  ) {}

  getZones(queryParams: any): Observable<Zone[]> {
    let params = new HttpParams();

    for (const key in queryParams) {
      if (queryParams.hasOwnProperty(key)) {
        params = params.append(key, queryParams[key]);
      }
    }
    return this.http.get<Zone[]>(this.dataService.apiEndpoint+'/ShowGeneralZone', { params });
  }
}

