import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCompanyListComponent } from './components/user-company-list/user-company-list.component';

const routes: Routes = [
  {
    path: '',
    component: UserCompanyListComponent,
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
export class UserCompanyRoutingModule { }
