import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, CanLoad } from '@angular/router';
import { VexRoutes } from "src/@vex/interfaces/vex-route.interface";
import { CustomLayoutComponent } from "./custom-layout/custom-layout.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { AuthGuard } from "@shared/guards/auth.guard";
import { UserManageComponent } from "./pages/user/components/user-manage/user-manage.component";


const childrenRoutes: VexRoutes = [
  {
    path: 'register',
    component: UserManageComponent
  },
  {
    path: "countries",
    loadChildren: () =>
      import("./pages/country/country.module").then((m) => m.CountryModule),
    data: {
      containerEnabled: true,
    },
  },
  {
    path: "provinces",
    loadChildren: () =>
      import("./pages/province/province.module").then((m) => m.ProvinceModule),
    data: {
      containerEnabled: true,
    },
  },
  {
    path: "communities",
    loadChildren: () =>
      import("./pages/community/community.module").then((m) => m.CommunityModule),
    data: {
      containerEnabled: true,
    },
  },
  {
    path: "departments",
    loadChildren: () =>
      import("./pages/department/department.module").then((m) => m.DepartmentModule),
    data: {
      containerEnabled: true,
    },
  },
  {
    path: "documentType",
    loadChildren: () =>
      import("./pages/document-type/document-type.module").then((m) => m.DocumentTypeModule),
    data: {
      containerEnabled: true,
    },
  },
  {
    path: "role",
    loadChildren: () =>
      import("./pages/role/role.module").then((m) => m.RoleModule),
    data: {
      containerEnabled: true,
    },
  },
  {
    path: "menu",
    loadChildren: () =>
      import("./pages/menu/menu.module").then((m) => m.MenuModule),
    data: {
      containerEnabled: true,
    },
  },
  {
    path: "menu-role",
    loadChildren: () =>
      import("./pages/menu-role/menu-role.module").then((m) => m.MenuRoleModule),
    data: {
      containerEnabled: true,
    },
  },
  {
    path: "compania",
    loadChildren: () =>
      import("./pages/company/company.module").then((m) => m.CompanyModule),
    data: {
      containerEnabled: true,
    },
  },
  {
    path: "user",
    loadChildren: () =>
      import("./pages/user/user.module").then((m) => m.UserModule),
    data: {
      containerEnabled: true,
    },
  },
  {
    path: "user-company",
    loadChildren: () =>
      import("./pages/user-company/user-company.module").then((m) => m.UserCompanyModule),
    data: {
      containerEnabled: true,
    },
  },
  {
    path: "user-role",
    loadChildren: () =>
      import("./pages/user-role/user-role.module").then((m) => m.UserRoleModule),
    data: {
      containerEnabled: true
    },
  },
  //Endpoint de Fichajes
  {
    path: "holiday",
    loadChildren: () =>
      import("./pages/holiday/holiday.module").then((m) => m.HolidayModule),
    data: {
      containerEnabled: true,
    },
  },
  {
    path: "annual-Leave",
    loadChildren: () =>
      import("./pages/annual-leave/annual-leave.module").then((m) => m.AnnualLeaveModule),
    data: {
      containerEnabled: true,
    },
  }, 
  {
    path: "vacation",
    loadChildren: () =>
      import("./pages/vacation/vacation.module").then((m) => m.VacationModule),
    data: {
      containerEnabled: true,
    },
  }, 
  {
    path: "manual-singing",
    loadChildren: () =>
      import("./pages/manual-signing/manual-signing.module").then((m) => m.ManualSigningModule),
    data: {
      containerEnabled: true,
    },
  }, 
  {
    path: "map-Layout",
    loadChildren: () =>
      import("./pages/map/map.module").then((m) => m.MapModule),
    data: {
      containerEnabled: true,
    },
  }, 
  {
    path: "**",
    component: NotFoundComponent,
  },
];

const routes: VexRoutes = [
  {
    path: "",
    redirectTo: "countries",
    pathMatch: "full",
  },
  {
    path: "login",
    loadChildren: () =>
      import("./pages/auth/auth.module").then((m) => m.AuthModule),
    data: {
      containerEnabled: true,
    },
  },
  {
    path: "",
    component: CustomLayoutComponent,
    children: childrenRoutes,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: "enabled",
      relativeLinkResolution: "corrected",
      anchorScrolling: "enabled",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
