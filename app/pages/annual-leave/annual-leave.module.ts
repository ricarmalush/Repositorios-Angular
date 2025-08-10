import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnnualLeaveRoutingModule } from './annual-leave-routing.module';
import { AnnualleaveManageComponent } from './components/annualleave-manage/annualleave-manage.component';
import { AnnualleaveListComponent } from './components/annualleave-list/annualleave-list.component';
import { ButtonResetFiltersComponent } from '@shared/components/reusables/button-reset-filters/button-reset-filters.component';
import { FilterDateRangeYmdComponent } from '@shared/components/reusables/filter-date-range-ymd/filter-date-range-ymd.component';
import { ListTableComponent } from '@shared/components/reusables/list-table/list-table.component';
import { MenuComponent } from '@shared/components/reusables/menu/menu.component';
import { SearchBoxMultipleComponent } from '@shared/components/reusables/search-box-multiple/search-box-multiple.component';
import { SharedModule } from '@shared/shared.module';
import { ExportExcelScheduleComponent } from '@shared/components/reusables/export-excel-schedule/export-excel-schedule.component';


@NgModule({
  declarations: [
    AnnualleaveManageComponent,
    AnnualleaveListComponent,
  ],
  imports: [
    CommonModule,
    AnnualLeaveRoutingModule,
    SharedModule,
    ListTableComponent,
    SearchBoxMultipleComponent,
    MenuComponent,
    FilterDateRangeYmdComponent,
    ButtonResetFiltersComponent,
    ExportExcelScheduleComponent
  ]
})
export class AnnualLeaveModule { }
