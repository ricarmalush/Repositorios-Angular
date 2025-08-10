import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManualSigningListComponent } from './components/manual-signing-list/manual-signing-list.component';

const routes: Routes = [
  {
    path: '',
    component: ManualSigningListComponent,
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
export class ManualSigningRoutingModule { }
