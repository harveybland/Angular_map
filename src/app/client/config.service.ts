import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  // Map
  path() {
    return `http://localhost:7071/api/ExtractPath`
  }

  details(guid: number) {
    return `http://localhost:7071/api/GetDetails?chargeDeviceId=${guid}`
  }

  //Emissions
  EvEmissions() {
    return `http://localhost:7071/api/Emissions`
  }

  // Lookups
  ConnectorType() {
    return `http://localhost:7071/api/ConnectorType`
  }

  EvManufacturer() {
    return `http://localhost:7071/api/Manufacturers`
  }

  EvModel() {
    return `http://localhost:7071/api/Models`
  }

  EvDesription() {
    return `http://localhost:7071/api/Descriptions`
  }
}
