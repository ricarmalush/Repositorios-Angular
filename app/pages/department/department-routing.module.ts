import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentListComponent } from './components/department-list/department-list.component';

const routes: Routes = [
  {
    path: '',
    component: DepartmentListComponent,
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
export class DepartmentRoutingModule { }
