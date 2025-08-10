import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HolidayRoutingModule } from './holiday-routing.module';
import { ButtonResetFiltersComponent } from '@shared/components/reusables/button-reset-filters/button-reset-filters.component';
import { FilterDateRangeYmdComponent } from '@shared/components/reusables/filter-date-range-ymd/filter-date-range-ymd.component';
import { ListTableComponent } from '@shared/components/reusables/list-table/list-table.component';
import { MenuComponent } from '@shared/components/reusables/menu/menu.component';
import { SearchBoxMultipleComponent } from '@shared/components/reusables/search-box-multiple/search-box-multiple.component';
import { SharedModule } from '@shared/shared.module';
import { HolidayListComponent } from './components/holiday-list/holiday-list.component';
import { HolidayManageComponent } from './components/holiday-manage/holiday-manage.component';
import { ExportExcelScheduleComponent } from '@shared/components/reusables/export-excel-schedule/export-excel-schedule.component';



@NgModule({
  declarations: [
    HolidayManageComponent,
    HolidayListComponent
  ],
  imports: [
    CommonModule,
    HolidayRoutingModule,
    SharedModule,
    ListTableComponent,
    SearchBoxMultipleComponent,
    MenuComponent,
    ExportExcelScheduleComponent,
    FilterDateRangeYmdComponent,
    ButtonResetFiltersComponent,
  ]
})
export class HolidayModule { }
