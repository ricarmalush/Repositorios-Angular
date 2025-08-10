
import icCategory from "@iconify/icons-ic/twotone-category";
import icCalendarMonth from "@iconify/icons-ic/twotone-calendar-today";
import { GenericValidators } from "@shared/validators/generic-validators";
import { TableColumns } from "@shared/models/list-table.interface";
import { SearchOptions } from "@shared/models/search-options.interface";
import { IconsService } from "@shared/services/icons.service";
import { MenuItemsSigning } from "@shared/models/menu-items-signing";
import { ManualSigningResponse } from "../../models/manual-signing-response.interface";

const searchOptions: SearchOptions[] = [
  {
    label: "Nombre",
    value: 1,
    placeholder: "Buscar por Nombre",
    validation: [GenericValidators.defaultName],
    validation_desc: "Sólo se permite letras en esta búsqueda.",
    icon: "icName",
  },
];

const menuItems: MenuItemsSigning[] = [
  {
    type: "link",
    id: "all",
    icon: IconsService.prototype.getIcon("icViewHeadline"),
    label: "Todos",
  },
];

const tableColumns: TableColumns<ManualSigningResponse>[] = [
  {
    label: "NOMBRE",
    cssLabel: ["font-bold", "text-sm"],
    property: "fullName",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: true,
    sort: true,
    sortProperty: "fullName",
    visible: true,
    download: true,
  },
  {
    label: "FECHA/HORA",
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
    label: "TIPO ENTRADA",
    cssLabel: ["font-bold", "text-sm"],
    property: "type",
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
  filename: "listado-de-fichajes",
};

