import { Access } from './../../interface/api';
import { MapService } from './map.service';
import { Component, OnInit } from '@angular/core';
import { tileLayer, marker } from 'leaflet';
import { ConnectorDetails } from 'src/app/interface/api';
import * as L from 'leaflet';
import 'leaflet.markercluster'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(private mapService: MapService) { }

  map: any;
  guid: any;
  lat: any;
  lng: any;
  polyline: string = '';
  chargingStation: any;
  Connectors: ConnectorDetails[] = [];
  Access: Access[] = [];
  decoded: [number, number][] = [];
  layerGroup: any;

  currentLat: any;
  currentLong: any;

  currentLocation: any = 'Leicester';
  vacancyLocation: any = '54.00,-1.00';
  connectorType: string = '';

  selectedOption: any;
  options = [
    { name: "All", value: '' },
    { name: "3-pin Type G (BS1363)", value: '3-pin Type G (BS1363)' },
    { name: "JEVS G105 (CHAdeMO) DC", value: 'JEVS G105 (CHAdeMO) DC' },
    { name: "Type 1 SAEJ1772 (IEC 62196)", value: 'Type 1 SAEJ1772 (IEC 62196)' }
  ]

  ngOnInit() {
    this.initMap();
    // this.setPath('');
    // this.getLocation();
  }

  getPath(type: any) {
    this.connectorType = type;
  }

  setPath() {
    this.mapService.getPath(this.currentLocation, this.vacancyLocation, this.connectorType).subscribe(resp => {
      this.polyline = resp.Polyline

      this.decoded = (this.decode(this.polyline));
      this.layerGroup.clearLayers();
      this.layerGroup.addLayer(L.polyline(this.decoded));

      var locations = resp.ConnectorResults;
      var newIcon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.0.3/dist/images/marker-icon.png',
        iconSize: [20, 30],
      });

      var markers = L.markerClusterGroup({
        showCoverageOnHover: false,
      })
      for (var i = 0; i < locations.length; i++) {
        let marker = L.marker([locations[i].Latitude, locations[i].Longitude], { icon: newIcon })
          .bindTooltip(locations[i].Name + '</br> ' + locations[i].ConnectorType)
        markers.addLayer(marker).addTo(this.layerGroup);
        this.guid = locations[i].ChargeDeviceId;
        let guid = this.guid;
        let scope = this;

        marker.on('click', function (e) {
          scope.scrollToStation(e.target._latlng.lat, e.target._latlng.lng)
          scope.getStation(guid)
        });
      }
    })
  }

  getLocation() {
    let scope = this;
    navigator.geolocation.getCurrentPosition(function (resp) {
      scope.currentLat = resp.coords.latitude;
      scope.currentLong = resp.coords.longitude;
      scope.currentLocation = [resp.coords.latitude, resp.coords.longitude]
    })
  }

  getStation(guid: any) {
    this.mapService.getDetails(guid).subscribe(resp => {
      if (resp.County === 'NA') {
        resp.County = ''
      }
      this.chargingStation = resp;
      this.Connectors = resp.Connectors;
      this.Access = resp.Access;
    })
  }

  scrollToStation(lat: any, lng: any) {
    const zoom = this.map.getZoom() > 12 ? this.map.getZoom() : 12;
    this.map.flyTo([lat, lng]);
  }

  initMap() {
    this.map = L.map('map', {
      center: [54.00, -2.0],
      zoom: 6
    });

    const key = 'pk.705dec6f3f73da4d251b9a4bd66faa89'

    let tiles = tileLayer(`https://{s}-tiles.locationiq.com/v2/obk/r/{z}/{x}/{y}.png?key=${key}`, {
      maxZoom: 18,
      minZoom: 3,
      attribution: '...'
    });

    tiles.addTo(this.map);
    this.layerGroup = L.layerGroup().addTo(this.map);
  }

  // Decode polyline
  decode(value: any) {
    var values = this.decodeIntegers(value)
    var points: [number, number][] = []

    for (var i = 0; i < values.length; i += 2) {
      points.push([
        (values[i + 0] += (values[i - 2] || 0)) / 1e5,
        (values[i + 1] += (values[i - 1] || 0)) / 1e5,
      ])
    }
    return points
  }

  decodeSign(value: any) {
    return value & 1 ? ~(value >>> 1) : (value >>> 1)
  }

  decodeIntegers(value: any) {
    var values = []
    var byte = 0
    var current = 0
    var bits = 0

    for (var i = 0; i < value.length; i++) {

      byte = value.charCodeAt(i) - 63
      current = current | ((byte & 0x1F) << bits)
      bits = bits + 5

      if (byte < 0x20) {
        values.push(this.decodeSign(current))
        current = 0
        bits = 0
      }
    }
    return values
  }
}
