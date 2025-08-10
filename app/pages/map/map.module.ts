import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapRoutingModule } from './map-routing.module';
import { MapLayoutComponent } from './components/map-layout/map-layout.component';
import { CargandoMapaComponent } from './components/cargando-mapa/cargando-mapa.component';

import { SharedModule } from '@shared/shared.module';
import { ButtonResetFiltersComponent } from '@shared/components/reusables/button-reset-filters/button-reset-filters.component';
import { FilterDateRangeYmdComponent } from '@shared/components/reusables/filter-date-range-ymd/filter-date-range-ymd.component';
import { SearchBoxMultipleComponent } from '@shared/components/reusables/search-box-multiple/search-box-multiple.component';


@NgModule({
  declarations: [
    MapLayoutComponent,
    CargandoMapaComponent
  ],
  imports: [
    CommonModule,
    MapRoutingModule,
    FilterDateRangeYmdComponent,
    ButtonResetFiltersComponent,
    SearchBoxMultipleComponent,
    SharedModule,
    SearchBoxMultipleComponent,
    FilterDateRangeYmdComponent,
    ButtonResetFiltersComponent,
]
})
export class MapModule { }
