import { Component, OnInit } from '@angular/core';
import { Map } from 'leaflet';


@Component({
  selector: 'app-map2',
  templateUrl: './map2.component.html',
  styleUrls: ['./map2.component.scss']
})
export class Map2Component implements OnInit {

  map: any;

  constructor() { }

  ngOnInit() {
  }

  onMapReady(map: Map) {
    this.map = map;
  }

}
