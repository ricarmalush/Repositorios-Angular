import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HolidayListComponent } from './components/holiday-list/holiday-list.component';

const routes: Routes = [
  {
    path: '',
    component: HolidayListComponent,
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
export class HolidayRoutingModule { }
