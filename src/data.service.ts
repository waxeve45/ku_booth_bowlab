import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Zone } from './app/model/zonemodel/zone.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private userData:any;
  

  apiEndpoint = "http://localhost/api_booth_csc";

    // getUserData(){
    // return this.userData;
    // }

}

