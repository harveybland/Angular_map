import { MapService } from './map.service';
import { Component, OnInit } from '@angular/core';
import { tileLayer, marker } from 'leaflet';
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
  chargingStation: any;
  decoded: [number, number][] = [];

  ngOnInit(): void {
    this.mapService.getChargingStations().subscribe(resp => {
      var locations = resp;
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
        markers.addLayer(marker).addTo(this.map);
        this.guid = locations[i].ChargeDeviceId;
        let guid = this.guid;
        let scope = this;

        marker.on('click', function (e) {
          scope.scrollToStation(e.target._latlng.lat, e.target._latlng.lng)
          scope.getStation(guid)
        });
      }
    })
    this.initMap();
  }

  getStation(guid: any) {
    this.mapService.getchargingStation(guid).subscribe(resp => {
      this.chargingStation = resp;
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

    this.decoded = (this.decode("g\u0060ihI|jxKuVucCm@m\u0060@qG{a@gPqg@kIw\u0060@gLqv@~Aw@z@tArRSdXkApLcFvLaNjEcJbNsb@TmAn[iv@hNmSrOaOlToTxMgC~]ab@fg@o\u0060@nNaQ|KkF|LxBnFjDfEAnFq@fFkJtMkk@\u0060NsVrDuEhAsH\u0060Eqe@pM{}@vAgiAjGacAbGySjMe[jP}W\u0060\u0060@o]dPqXzIqj@bGwXtPiVlLiGbRmDhFqOpDgg@dA{G|BuAbEyO~AuWxCsd@~GkYrIwPbQ{{@~J}y@z@mKtJsh@dHyPdNgRpO_KfO_EpKcIlEoOfCqTvLqO|QgLhM}LpG}OfJiKtR}OlAcAb@\u0060Gk@vLTjCvHJzGI?C@C@CDAFLp@DhLsCfDsAtFqOaBsa@TkJnCsF\u0060X{Jji@ie@dJg_@zH}KbO}LnIwEzByOzB}O~F{i@vIcRtJoVhK{a@vBaGBKjSgi@fBqDbEc@rFm@tEaBnBqHhAd@~NcFbJpAfPtPdT~WfEbBrH{@|F}A|JjAdLjA\u0060DqAhA}GlFuZj@cR[_GrQmNbKgJtZuL|k@oPxPqJvp@yn@~U_YlB{GsLsQ{Uaa@}Iaf@e@_XxAuW|Nkn@lHci@^}e@}Fsv@uS{_CkJuiA\u0060@}_@rDkWjJgW~HgKfZsShMgQhIsSfLuc@~Neq@xA{_@iC_\u0060@qNwv@cCmj@Lc{@XcxA{@wbA}Bak@tBwx@bKokAo@kGpAaGlEoA|BjCfUrYbNvVv\\xx@dZju@tR|p@lMdVpOdQvW~QhShKtTbEtb@oCjo@aKp_@sH\u0060QuJnNqMtOkWzMkZvp@qz@\u0060MwL|K_EtLChMpC|_@xRhUhT\u0060WlUpOdE~L?hRnC\u0060PpJzY|[hVdSfWzIj_@fAza@qElVuMlTkW|Zmd@\u0060NcKlQoGlUi@nUhI|[bRtPtCrZaBh^qQ\u0060UsUnOwU\u0060Ok\u0060@xOyd@dRgUxbAaw@lSyTrKeRrVi^rXyYhJmG~LcDnLAhK\u0060C\u0060XzHnIi@\u0060KcEpTyVnWiTdOwSrHeQmAyIbByErEnIrA~ItBxHRxOpEnQdX\u0060[vMnYtBlBNrGwGvsAQhVpD~Z\u0060Kdp@|Gvp@{Clt@{BjZyAda@lDzZ|Mn\u0060@tAnCrB?xDfRzMzLdCp@\u0060AuAhFcGzFgBlKyD\u0060RuDnS}Vlm@m[nI?bM\u0060CbNkHxCyCtF]~RpAzE_AzSuX~GwIdBgN~Cy^jEmCdLbGdH{FnOsSzBiEdBmChAbC|BrEAf@{CdILp@ChAmB~CsA~HtA\u0060IhBxAbC}@hH{JhGmD\u0060@mCzEqAvLzElEQA~E|@|Cx@WlAXh@B"));

    this.map.addLayer(L.polyline(this.decoded));
    tiles.addTo(this.map);
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
