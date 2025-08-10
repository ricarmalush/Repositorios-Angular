import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapLayoutComponent } from './components/map-layout/map-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MapLayoutComponent,
    data: {
      scrollDisabled: true,
      toolbarShadowEnabled: true
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule { }
