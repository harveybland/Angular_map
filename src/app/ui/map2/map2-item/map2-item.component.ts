import { Component, OnInit } from '@angular/core';
import { Map } from 'leaflet';
import { Map2Service } from '../map2.service'

@Component({
  selector: 'app-map2-item',
  templateUrl: './map2-item.component.html',
  styleUrls: ['./map2-item.component.scss']
})
export class Map2ItemComponent implements OnInit {

  constructor(private _map2Service: Map2Service) { }

  ngOnInit() {
    // this.getPath()
    // this.getDetails()

  }

  // getPath() {
  //   this._map2Service.getPath().subscribe(resp => {
  //     console.log(resp)
  //   })
  // }

  // getDetails() {
  //   this._map2Service.getDetails().subscribe(resp => {
  //     console.log(resp)
  //   })
  // }

}
