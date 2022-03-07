import { emissionsService } from './emissions.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emissions',
  templateUrl: './emissions.component.html',
  styleUrls: ['./emissions.component.scss']
})
export class emissionsComponent implements OnInit {

  manufacturer$ = this._emissionsService.manufacturer$;
  model$ = this._emissionsService.model$;
  description$ = this._emissionsService.description$;

  public emissions: any;

  manuFacturer: string = '';
  model: string = '';
  description: string = '';

  constructor(private _emissionsService: emissionsService) { }

  ngOnInit() {
    this._emissionsService.manufacturerLookup().subscribe();
  }

  getManuFacturer(e: any) {
    this.manuFacturer = e.target.value
    this._emissionsService.modelLookup(e.target.value).subscribe();
  }

  getModel(e: any) {
    this._emissionsService.desriptionLookup(this.manuFacturer, e.target.value).subscribe();
  }

  getEmissions(e: any) {
    console.log(e.target.value)
    this._emissionsService.getEmissions(e.target.value).subscribe(data => {
      this.emissions = data
    })
  }

  // result() {
  //   let model = this.resultModel()
  //   console.log(model)
  // }

  // resultModel() {
  //   return {
  //     manufacturer: this.manuFacturer,
  //     model: this.model
  //   }
  // }

}
