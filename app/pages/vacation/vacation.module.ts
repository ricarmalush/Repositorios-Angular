import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VacationRoutingModule } from './vacation-routing.module';
import { VacationListComponent } from './components/vacation-list/vacation-list.component';
import { VacationManageComponent } from './components/vacation-manage/vacation-manage.component';
import { SharedModule } from '@shared/shared.module';
import { ButtonResetFiltersComponent } from '@shared/components/reusables/button-reset-filters/button-reset-filters.component';
import { ExportExcelScheduleComponent } from '@shared/components/reusables/export-excel-schedule/export-excel-schedule.component';
import { FilterDateRangeYmdComponent } from '@shared/components/reusables/filter-date-range-ymd/filter-date-range-ymd.component';
import { ListTableComponent } from '@shared/components/reusables/list-table/list-table.component';
import { MenuComponent } from '@shared/components/reusables/menu/menu.component';
import { SearchBoxMultipleComponent } from '@shared/components/reusables/search-box-multiple/search-box-multiple.component';


@NgModule({
  declarations: [
    VacationListComponent,
    VacationManageComponent
  ],
  imports: [
    CommonModule,
    VacationRoutingModule,
    SharedModule,
    ListTableComponent,
    SearchBoxMultipleComponent,
    MenuComponent,
    ExportExcelScheduleComponent,
    FilterDateRangeYmdComponent,
    ButtonResetFiltersComponent,
  ]
})
export class VacationModule { }
