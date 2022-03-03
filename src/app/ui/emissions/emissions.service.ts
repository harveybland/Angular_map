import { BehaviorSubject } from 'rxjs';
import { ConfigService } from '../../client/config.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Emissions } from 'src/app/interface/api';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class emissionsService {

  private _manuFacturer$ = new BehaviorSubject<Emissions[]>([]);
  manuFacturer$ = this._manuFacturer$.asObservable();

  private _model$ = new BehaviorSubject<Emissions[]>([]);
  model$ = this._model$.asObservable();

  constructor(private http: HttpClient,
    private configService: ConfigService) { }

  getEmissions() {
    return this.http.get<Emissions[]>(this.configService.emissions()).pipe(map(resp => {
      const manuFacturer = Array.from(resp.reduce((m, t) => m.set(t.ManuFacturer, t), new Map()).values())
      const model = Array.from(resp.reduce((m, t) => m.set(t.Model, t), new Map()).values())

      this._manuFacturer$.next(manuFacturer)
      this._model$.next(model)
    }))
  }

}
