import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VacationListComponent } from './components/vacation-list/vacation-list.component';

const routes: Routes = [
  {
    path: '',
    component: VacationListComponent,
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
export class VacationRoutingModule { }
