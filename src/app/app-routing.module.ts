import { MapComponent } from './ui/map/map.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Map2Component } from './ui/map2/map2.component';

const routes: Routes = [
  {
    path: '',
    component: MapComponent
  },
  {
    path: 'map',
    component: Map2Component
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
