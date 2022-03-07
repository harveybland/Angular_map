import { Ioption } from './../../interface/api';
import { BehaviorSubject } from 'rxjs';
import { ConfigService } from '../../client/config.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Emissions } from 'src/app/interface/api';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class emissionsService {

  private _manufacturer$ = new BehaviorSubject<[]>([]);
  manufacturer$ = this._manufacturer$.asObservable();

  private _model$ = new BehaviorSubject<[]>([]);
  model$ = this._model$.asObservable();

  private _description$ = new BehaviorSubject<Ioption[]>([]);
  description$ = this._description$.asObservable();

  private _emissions$ = new BehaviorSubject<Emissions[]>([]);
  emissions$ = this._emissions$.asObservable();

  constructor(private http: HttpClient,
    private configService: ConfigService) { }

  manufacturerLookup() {
    return this.http.get<[]>(this.configService.EvManufacturer()).pipe(map(resp => {
      this._manufacturer$.next(resp)
    }))
  }

  modelLookup(manufacturer: string) {
    let params = new HttpParams();
    if (!!manufacturer) {
      params = params.append('manufacturer', manufacturer.toString())
    }
    return this.http.get<[]>(this.configService.EvModel(), { params: params }).pipe(map(resp => {
      this._model$.next(resp)
    }))
  }

  desriptionLookup(manufacturer: string, model: string) {
    let params = new HttpParams();
    if (!!manufacturer) {
      params = params.append('Manufacturer', manufacturer.toString())
    }
    if (!!model) {
      params = params.append('Model', model.toString())
    }
    return this.http.get<Ioption[]>(this.configService.EvDesription(), { params: params }).pipe(map(resp => {
      this._description$.next(resp)
    }))
  }

  getEmissions(Co2Emissionsid: number) {
    let params = new HttpParams();
    if (!!Co2Emissionsid) {
      params = params.append('Co2Emissionsid', Co2Emissionsid.toString())
    }
    return this.http.get<Emissions[]>(this.configService.EvEmissions(), { params: params })
  }

}
