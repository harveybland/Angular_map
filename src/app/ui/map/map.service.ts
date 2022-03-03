import { Details, ExactPath } from './../../interface/api';
import { ConfigService } from './../../client/config.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  // private _chargingStation$ = new BehaviorSubject<chargingStation[]>([]);
  // chargingStation$ = this._chargingStation$.asObservable();

  constructor(private http: HttpClient,
    private configService: ConfigService) { }

  getPath(currentLocation?: string, vacancyLocation?: string, ConnectorResults?: string) {
    let params = new HttpParams();
    if (!!currentLocation) {
      params = params.append('origin', currentLocation.toString())
    }
    if (!!vacancyLocation) {
      params = params.append('destination', vacancyLocation.toString())
    }
    if (!!ConnectorResults) {
      params = params.append('connectorType', ConnectorResults.toString())
    }
    return this.http.get<ExactPath>(this.configService.path(), { params: params })
  }

  getDetails(guid: number) {
    return this.http.get<Details>(this.configService.details(guid))
  }
}
