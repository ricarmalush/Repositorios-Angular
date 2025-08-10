import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunityListComponent } from './components/community-list/community-list.component';


const routes: Routes = [
  {
    path: '',
    component: CommunityListComponent,
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
export class CommunityRoutingModule { }
