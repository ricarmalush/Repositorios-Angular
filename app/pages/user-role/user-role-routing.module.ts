import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRoleListComponent } from './components/user-role-list/user-role-list.component';

const routes: Routes = [
  {
    path: '',
    component: UserRoleListComponent,
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
export class UserRoleRoutingModule { }
