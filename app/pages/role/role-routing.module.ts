import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleListComponent } from './components/role-list/role-list.component';

const routes: Routes = [
  {
    path: '',
    component: RoleListComponent,
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
export class RoleRoutingModule { }
