import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProvinceListComponent } from './components/province-list/province-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProvinceListComponent,
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
export class ProvinceRoutingModule { }
