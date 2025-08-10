import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnualleaveListComponent } from './components/annualleave-list/annualleave-list.component';


const routes: Routes = [
  {
    path: '',
    component: AnnualleaveListComponent,
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
export class AnnualLeaveRoutingModule { }
