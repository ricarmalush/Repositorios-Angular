import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuRoleListComponent } from './components/menu-role-list/menu-role-list.component';

const routes: Routes = [
  {
    path: '',
    component: MenuRoleListComponent,
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
export class MenuRoleRoutingModule { }
