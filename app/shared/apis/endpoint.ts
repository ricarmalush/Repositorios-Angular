import { HttpHeaders } from "@angular/common/http";

export const endpoint = {
   //COUNTRY MODULE
   LIST_COUNTRIES: "Countries",
   COUNTRY_BY_ID: "Countries/",
   COUNTRY_REGISTER: "Countries/Register/",
   COUNTRY_EDIT: "Countries/Edit/",
   COUNTRY_REMOVE: "Countries/Remove/",
   COUNTRY_RECOVER: "Countries/RecoverDeleteCountry/",
 
   //PROVINCE MODULE
   LIST_PROVINCES: "Provinces",
   COUNTRIES_SELECT: "Countries/Select",
   PROVINCE_SELECT: "Provinces/Select",
   PROVINCE_BY_COUNTRY: "Provinces/ProvinceByCountry",
   PROVINCE_BY_ID: "Provinces/",
   PROVINCE_REGISTER: "Provinces/Register/",
   PROVINCE_EDIT: "Provinces/Edit/",
   PROVINCE_REMOVE: "Provinces/Remove/",
   PROVINCE_RECOVER: "Provinces/RecoverDeletedProvince/",
 
  //COMMUNITY MODULE
    LIST_COMMUNITIES: "Communities",
    COMMUNITIES_SELECT: "Communities/Select",
    COMMUNITY_BY_ID: "Communities/",
    LIST_COMMUNITY_BY_PROVINCE: "Communities/CommunityByProvince",
    COMMUNITY_REGISTER: "Communities/Register/",
    COMMUNITY_EDIT: "Communities/Edit/",
    COMMUNITY_REMOVE: "Communities/Remove/",
    COMMUNITY_RECOVER: "Communities/RecoverDeleteCommunity/",

//DOCUMENTYPE MODULE
  LIST_DOCUMENTYPES: "DocumentType",
  DOCUMENTYPES_SELECT: "DocumentType/Select",
  DOCUMENTYPE_BY_ID: "DocumentType/",
  DOCUMENTYPE_REGISTER: "DocumentType/Register/",
  DOCUMENTYPE_EDIT: "DocumentType/Edit/",
  DOCUMENTYPE_REMOVE: "DocumentType/Remove/",
  DOCUMENTYPE_RECOVER: "DocumentType/RecoverDeleteDepartment/",

  //DEPARTMENT MODULE
  LIST_DEPARTMENT: "Departments",
  DEPARTMENTS_SELECT: "Departments/Select",
  DEPARTMENT_BY_ID: "Departments/",
  DEPARTMENT_REGISTER: "Departments/Register/",
  DEPARTMENT_EDIT: "Departments/Edit/",
  DEPARTMENT_REMOVE: "Departments/Remove/",
  DEPARTMENT_RECOVER: "Departments/RecoverDeleteDepartment/",

  //ROLE MODULE
  LIST_ROLES: "roles",
  ROLES_SELECT: "roles/Select",
  ROLE_BY_ID: "roles/",
  ROLE_REGISTER: "roles/Register/",
  ROLE_EDIT: "roles/Edit/",
  ROLE_REMOVE: "roles/Remove/",
  ROLE_RECOVER: "roles/RecoverDeleteRole/",

  //MENU MODULE
  LIST_MENUS: "menus",
  MENUS_SELECT: "menus/Select",
  MENU_BY_ID: "menus/",
  MENU_REGISTER: "menus/Register/",
  MENU_EDIT: "menus/Edit/",
  MENU_REMOVE: "menus/Remove/",
  MENU_RECOVER: "menus/RecoverDeleteMenu/", 

   //MENU MENUROLE
   LIST_MEMUROLES: "MenuRoles",
   MENUROLES_SELECT: "menuRoles/Select",
   MENUROLE_BY_ID: "menuRoles/",
   MENUROLE_REGISTER: "menuRoles/Register/",
   MENUROLE_EDIT: "menuRoles/Edit/",
   MENUROLE_REMOVE: "MenuRoles/Remove/",
   MENUROLE_RECOVER: "menuRoles/RecoverDeleteMenu/", 

   //MENU USER
   LIST_USER: "User",
   USER_SELECT: "User/Select",
   USER_BY_ID: "user/",
   USER_REGISTER: "User/Register/",
   USER_EDIT: "user/Edit/",
   USER_REMOVE: "user/Remove/",
   USER_RECOVER: "user/RecoverDeleteMenu/", 

   //MENU COMPANY
   LIST_COMPANY: "companies",
   COMPANY_SELECT: "companies/Select",
   COMPANY_BY_ID: "companies/",
   COMPANY_REGISTER: "Companies/Register",
   COMPANY_EDIT: "companies/Edit/",
   COMPANY_REMOVE: "companies/Remove/",
   COMPANY_RECOVER: "companies/RecoverDeleteCompany/", 

   //MENU USERCOMPANY
   LIST_USERCOMPANY: "UserCompanies",
   USERCOMPANY_SELECT: "UserCompanies/Select",
   USERCOMPANY_BY_ID: "UserCompanies/",
   USERCOMPANY_REGISTER: "UserCompanies/Register",
   USERCOMPANY_EDIT: "UserCompanies/Edit/",
   USERCOMPANY_REMOVE: "UserCompanies/Remove/",
   USERCOMPANY_RECOVER: "UserCompanies/ActivateUserCompany/", 

//USER ROLE
    LIST_USER_ROLE: "userRole",
    USER_ROLE_SELECT: "UserRole/Select",
    USER_ROLE_BY_ID: "userRole/",
    USER_ROLE_REGISTER: "userRole/Register",
    USER_ROLE_EDIT: "userRole/Edit/",
    USER_ROLE_REMOVE: "userRole/Remove/",
    USER_ROLE_RECOVER: "userRole/RecoverDeleteUserRole/", 

//MODULO DE FICHAJES
    LIST_HOLIDAY: "holiday",
    HOLIDAY_BY_ID: "holiday/",
    HOLIDAY_REGISTER: "holiday/Register/",
    HOLIDAY_EDIT: "holiday/Edit/",
    HOLIDAY_REMOVE: "holiday/Remove/",
    HOLIDAY_RECOVER: "holiday/RecoverDeleteHoliday/",

    LIST_VACATION: "vacation",
    VACATION_BY_ID: "vacation/",
    VACATION_REGISTER: "vacation/Register/",
    VACATION_EDIT: "vacation/Edit/",
    VACATION_REMOVE: "vacation/Remove/",
    VACATION_RECOVER: "vacation/RecoverDeleteVacation/",

    LIST_ANNUALLEAVE: "annualLeaveBalance",
    ANNUALLEAVE_BY_ID: "annualLeaveBalance/",
    ANNUALLEAVE_REGISTER: "annualLeaveBalance/Register/",
    ANNUALLEAVE_EDIT: "annualLeaveBalance/Edit/",
    ANNUALLEAVE_REMOVE: "annualLeaveBalance/Remove/",
    ANNUALLEAVE_RECOVER: "annualLeaveBalance/RecoverDeleteannualLeaveBalance/",

    LIST_MANUALSIGNING: "signingUp",
    MANUALSIGNING_REGISTER: "signingUp/Register/",
    MANUALSIGNING_EDIT: "signingUp/Edit/",
    MANUALSIGNING_REMOVE: "signingUp/Remove/",
    MANUALSIGNING_BY_ID: "signingUp/",

    LIST_SELECTACCESSPOINT: "signingUp/SelectAccessPoint",
    ACCESSPOINT: "signingUp/AccessPoint",

//FIN DE MODULO DE FICHAJES

  // AUTH MODULE
  LOGIN: "Auth/Login",
  LOGIN_GOOGLE: "Auth/LoginWithGoogle",

  // DOCUMENT TYPE MODULE
  LIST_DOCUMENT_TYPES: "DocumentType",
};

export const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};
