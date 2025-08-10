import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunityRoutingModule } from './community-routing.module';
import { CommunityListComponent } from './components/community-list/community-list.component';
import { CommunityManageComponent } from './components/community-manage/community-manage.component';
import { ButtonResetFiltersComponent } from '@shared/components/reusables/button-reset-filters/button-reset-filters.component';
import { FilterDateRangeYmdComponent } from '@shared/components/reusables/filter-date-range-ymd/filter-date-range-ymd.component';
import { ListTableComponent } from '@shared/components/reusables/list-table/list-table.component';
import { MenuComponent } from '@shared/components/reusables/menu/menu.component';
import { SearchBoxMultipleComponent } from '@shared/components/reusables/search-box-multiple/search-box-multiple.component';
import { SharedModule } from '@shared/shared.module';
import { ExportExcelComponent } from '@shared/components/reusables/export-excel/export-excel.component';


@NgModule({
  declarations: [
    CommunityListComponent,
    CommunityManageComponent
  ],
  imports: [
    CommonModule,
    CommunityRoutingModule,
    SharedModule,
    ListTableComponent,
    SearchBoxMultipleComponent,
    MenuComponent,
    ExportExcelComponent,
    FilterDateRangeYmdComponent,
    ButtonResetFiltersComponent,
  ]
})
export class CommunityModule { }
