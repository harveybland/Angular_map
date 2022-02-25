import { Component, OnInit } from '@angular/core';
import { MapService } from '../map.service';

@Component({
  selector: 'app-map2',
  templateUrl: './map2.component.html',
  styleUrls: ['./map2.component.scss']
})
export class Map2Component implements OnInit {

  constructor(private mapService: MapService) { }

  ngOnInit() {
  }

}
