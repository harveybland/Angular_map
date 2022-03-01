import { ConfigService } from './../../client/config.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Map2Service {

  // private _chargingStation$ = new BehaviorSubject<chargingStation[]>([]);
  // chargingStation$ = this._chargingStation$.asObservable();

  constructor(private http: HttpClient,
    private configService: ConfigService) { }

  // getPath() {
  //   return this.http.get(this.configService.path())
  // }

  // getDetails() {
  //   return this.http.get(this.configService.details())

  // }

}
