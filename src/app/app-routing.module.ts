import { MapComponent } from './ui/map/map.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { emissionsComponent } from './ui/emissions/emissions.component';

const routes: Routes = [
  {
    path: '',
    component: MapComponent
  },
  {
    path: 'emissions',
    component: emissionsComponent
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
