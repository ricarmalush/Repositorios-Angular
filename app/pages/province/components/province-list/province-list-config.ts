
import icCategory from "@iconify/icons-ic/twotone-category";
import icCalendarMonth from "@iconify/icons-ic/twotone-calendar-today";
import { GenericValidators } from "@shared/validators/generic-validators";
import { TableColumns } from "@shared/models/list-table.interface";
import { SearchOptions } from "@shared/models/search-options.interface";
import { MenuItems } from "@shared/models/menu-items.interface";
import { IconsService } from "@shared/services/icons.service";
import { ProvinceResponse } from "../../models/province-response.interface";


const searchOptions: SearchOptions[] = [
  {
    label: "País",
    value: 1,
    placeholder: "Buscar por Países",
    validation: [GenericValidators.defaultDescription],
    validation_desc: "Sólo se permite letras en esta búsqueda.",
    icon: "icDescription",
  },
  {
    label: "Provincia",
    value: 2,
    placeholder: "Buscar por Provincias",
    validation: [GenericValidators.defaultName],
    validation_desc: "Sólo se permite letras en esta búsqueda.",
    icon: "icName",
  },
];

const menuItems: MenuItems[] = [
  {
    type: "link",
    id: "all",
    icon: IconsService.prototype.getIcon("icViewHeadline"),
    label: "Todos",
  },
  {
    type: "link",
    id: "Activo",
    value: 1,
    icon: IconsService.prototype.getIcon("icLabel"),
    label: "Activo",
    class: {
      icon: "text-green",
    },
  },
  {
    type: "link",
    id: "Inactivo",
    value: 0,
    icon: IconsService.prototype.getIcon("icLabel"),
    label: "Inactivo",
    class: {
      icon: "text-gray",
    },
  },
];

const tableColumns: TableColumns<ProvinceResponse>[] = [
  {
    label: "PAÍS",
    cssLabel: ["font-bold", "text-sm"],
    property: "countryName",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: true,
    sort: false,
    sortProperty: "countryName",
    visible: true,
    download: true,
  },
  {
    label: "PROVINCIA",
    cssLabel: ["font-bold", "text-sm"],
    property: "provinceName",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: true,
    sort: true,
    sortProperty: "name",
    visible: true,
    download: true,
  },
  {
    label: "F. DE CREACIÓN",
    cssLabel: ["font-bold", "text-sm"],
    property: "auditCreateDate",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "datetime",
    sticky: false,
    sort: true,
    visible: true,
    download: true,
  },
  {
    label: "ESTADO",
    cssLabel: ["font-bold", "text-sm"],
    property: "stateProvince",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "badge",
    sticky: false,
    sort: false,
    visible: true,
    download: true,
  },
  {
    label: "",
    cssLabel: [],
    property: "icEdit",
    cssProperty: [],
    type: "icon",
    action: "edit",
    sticky: false,
    sort: false,
    visible: true,
    download: false
  },
  {
    label: "",
    cssLabel: [],
    property: "icDelete",
    cssProperty: [],
    type: "icon",
    action: "remove",
    sticky: false,
    sort: false,
    visible: true,
    download: false
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
  tableColumns: tableColumns,
  initialSort: "Id",
  state: "state",
  initialSortDir: "asc",
  getInputs,
  buttonLabel: "EDITAR",
  buttonLabel2: "ELIMINAR",
  // SEARCH FILTROS
  menuItems: menuItems,
  searchOptions: searchOptions,
  filters_dates_active: false,
  filters: filters,
  resetFilters,
  datesFilterArray: ["Fecha de creación"],
  filename: "listado-de-provincias",
};

