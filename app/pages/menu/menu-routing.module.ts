import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuListComponent } from './components/menu-list/menu-list.component';

const routes: Routes = [
  {
    path: '',
    component: MenuListComponent,
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
export class MenuRoutingModule { }
