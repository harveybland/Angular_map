import { emissionsService } from './emissions.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emissions',
  templateUrl: './emissions.component.html',
  styleUrls: ['./emissions.component.scss']
})
export class emissionsComponent implements OnInit {

  manuFacturer$ = this._emissionsService.manuFacturer$;
  model$ = this._emissionsService.model$;

  manuFacturer: string = '';
  model: string = '';
  constructor(private _emissionsService: emissionsService) { }

  ngOnInit() {
    this.getEmissions();
  }

  getEmissions() {
    this._emissionsService.getEmissions().subscribe()
  }

  result() {
    let model = this.resultModel()
    console.log(model)
  }

  resultModel() {
    return {
      manufacturer: this.manuFacturer,
      model: this.model
    }
  }

}
