
import icCategory from "@iconify/icons-ic/twotone-category";
import icCalendarMonth from "@iconify/icons-ic/twotone-calendar-today";
import { GenericValidators } from "@shared/validators/generic-validators";
import { SearchOptions } from "@shared/models/search-options.interface";

const searchOptions: SearchOptions[] = [
  {
    label: "Nombre",
    value: 1,
    placeholder: "Buscar por nombre",
    validation: [GenericValidators.defaultDescription],
    validation_desc: "Sólo se permite letras en esta búsqueda.",
    icon: "icDescription",
  },
];


const filters = {
  numFilter: 0,
  textFilter: "",
  stateFilter: null,
  startDate: "",
  endDate: "",
  refresh: false,
};

const resetFilters = {
  numFilter: 0,
  textFilter: "",
  stateFilter: null,
  startDate: "",
  endDate: "",
  refresh: false,
};

const getInputs: string = "";

export const componentSettings = {
  // ICONS
  icCategory: icCategory,
  icCalendarMonth: icCalendarMonth,
  // LAYOUT SETTINGS
  menuOpen: false,
  // TABLE SETTINGS
  initialSort: "Id",
  state: "state",
  initialSortDir: "asc",
  getInputs,
  // SEARCH FILTROS
  searchOptions: searchOptions,
  filters_dates_active: false,
  filters: filters,
  resetFilters,
};

