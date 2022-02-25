import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { chargingStation } from '../interface/api';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  // private _chargingStation$ = new BehaviorSubject<chargingStation[]>([]);
  // chargingStation$ = this._chargingStation$.asObservable();

  constructor(private http: HttpClient) { }

  getChargingStations() {
    return this.http.get<chargingStation[]>('https://localhost:44346/api/ChargingStation')
  }

  getchargingStation(id: number) {
    return this.http.get<chargingStation>('https://localhost:44346/api/ChargingStation/' + id)

  }
}
