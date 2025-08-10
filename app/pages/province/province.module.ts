import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvinceRoutingModule } from './province-routing.module';
import { ProvinceListComponent } from './components/province-list/province-list.component';
import { ButtonResetFiltersComponent } from '@shared/components/reusables/button-reset-filters/button-reset-filters.component';
import { FilterDateRangeYmdComponent } from '@shared/components/reusables/filter-date-range-ymd/filter-date-range-ymd.component';
import { ListTableComponent } from '@shared/components/reusables/list-table/list-table.component';
import { MenuComponent } from '@shared/components/reusables/menu/menu.component';
import { SearchBoxMultipleComponent } from '@shared/components/reusables/search-box-multiple/search-box-multiple.component';
import { SharedModule } from '@shared/shared.module';
import { ProvinceManageComponent } from './components/province-manage/province-manage.component';
import { ExportExcelComponent } from '@shared/components/reusables/export-excel/export-excel.component';


@NgModule({
  declarations: [
    ProvinceListComponent,
    ProvinceManageComponent
  ],
  imports: [
    CommonModule,
    ProvinceRoutingModule,    
    SharedModule,
    ListTableComponent,
    SearchBoxMultipleComponent,
    MenuComponent,
    ExportExcelComponent,
    FilterDateRangeYmdComponent,
    ButtonResetFiltersComponent,
  ]
})
export class ProvinceModule { }
