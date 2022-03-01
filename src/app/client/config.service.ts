import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  path() {
    return `http://localhost:7071/api/ExtractPath`
  }

  details(guid: number) {
    return `http://localhost:7071/api/GetDetails?chargeDeviceId=${guid}`
  }

}
