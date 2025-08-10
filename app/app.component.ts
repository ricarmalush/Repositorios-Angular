import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { Platform } from "@angular/cdk/platform";
import { DOCUMENT } from "@angular/common";
import { Component, Inject, LOCALE_ID, Renderer2, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IconsService } from "@shared/services/icons.service";
import { Settings } from "luxon";
import { filter, map } from "rxjs/operators";
import { ConfigName } from "../@vex/interfaces/config-name.model";
import { ConfigService } from "../@vex/services/config.service";
import { NavigationService } from "../@vex/services/navigation.service";
import { Style, StyleService } from "../@vex/services/style.service";
import { RoleGuard } from "@shared/guards/role.guard";

@Component({
  selector: "vex-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "vex";

  constructor(
    private configService: ConfigService,
    private styleService: StyleService,
    private renderer: Renderer2,
    private platform: Platform,
    @Inject(DOCUMENT) private document: Document,
    @Inject(LOCALE_ID) private localeId: string,
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    private roleGuard: RoleGuard,
    private iconsService: IconsService
  ) {
    Settings.defaultLocale = this.localeId;

    if (this.platform.BLINK) {
      this.renderer.addClass(this.document.body, "is-blink");
    }

    this.configService.updateConfig({
      sidenav: {
        title: "FIBRAPLAS ARAGON",
        imageUrl: "/assets/img/demo/logo.png",
        showCollapsePin: true,
      },
    });

    this.route.queryParamMap
      .pipe(
        map(
          (queryParamMap) =>
            queryParamMap.has("rtl") &&
            coerceBooleanProperty(queryParamMap.get("rtl"))
        )
      )
      .subscribe((isRtl) => {
        this.document.body.dir = isRtl ? "rtl" : "ltr";
        this.configService.updateConfig({
          rtl: isRtl,
        });
      });

    this.route.queryParamMap
      .pipe(filter((queryParamMap) => queryParamMap.has("layout")))
      .subscribe((queryParamMap) =>
        this.configService.setConfig(queryParamMap.get("layout") as ConfigName)
      );

    this.route.queryParamMap
      .pipe(filter((queryParamMap) => queryParamMap.has("style")))
      .subscribe((queryParamMap) =>
        this.styleService.setStyle(queryParamMap.get("style") as Style)
      );
  }

  ngOnInit() {
    this.initializeMenu();
  }

  private initializeMenu() {
    //const isAdmin = this.roleGuard.isAdmin();
    //console.log("Que tipo de Role Tengo: ", isAdmin)
    this.navigationService.items = [
      {
        type: "dropdown",
        label: "Administración",
        icon: this.iconsService.getIcon("icAdmin"),
        children: [
          {
            type: "dropdown",
            label: "Geografía",
            icon: this.iconsService.getIcon("icName"),
            children: [
              { type: "link", label: "Países", route: "countries" },
              { type: "link", label: "Provincia", route: "provinces" },
              { type: "link", label: "Comunidad", route: "communities" },
            ],
          },
          {
            type: "link",
            label: "Departamento",
            route: "departments",
            icon: this.iconsService.getIcon("icDashboard"),
          },
          {
            type: "link",
            label: "Tipo Documento",
            route: "documentType",
            icon: this.iconsService.getIcon("icDashboard"),
          },
          {
            type: "link",
            label: "Roles",
            route: "role",
            icon: this.iconsService.getIcon("icDashboard"),
          },
          {
            type: "link",
            label: "Menus",
            route: "menu",
            icon: this.iconsService.getIcon("icDashboard"),
          },
          {
            type: "link",
            label: "Menu Role",
            route: "menu-role",
            icon: this.iconsService.getIcon("icDashboard"),
          },
          {
            type: "link",
            label: "Compañía",
            route: "compania",
            icon: this.iconsService.getIcon("icDashboard"),
          },
          {
            type: "link",
            label: "Usuario",
            route: "user",
            icon: this.iconsService.getIcon("icDashboard"),
          },
          {
            type: "link",
            label: "Usuario Compañia",
            route: "user-company",
            icon: this.iconsService.getIcon("icDashboard"),
          },
          {
            type: "link",
            label: "Usuario Role",
            route: "user-role",
            icon: this.iconsService.getIcon("icDashboard"),
          },
          {
            type: "link",
            label: "Calendario Laboral",
            route: "holiday",
            icon: this.iconsService.getIcon("icDashboard"),
          },
        ],
      },
      {
        type: "dropdown",
        label: "Fichajes",
        icon: this.iconsService.getIcon("icFichaje"), 
        children: [          
          {
            type: "link",
            label: "Calendario Laboral",
            route: "holiday",
            icon: this.iconsService.getIcon("icDashboard"),
          },
          {
            type: "link",
            label: "Días Vacaciones",
            route: "annual-Leave",
            icon: this.iconsService.getIcon("icDashboard"),
          },
          {
            type: "link",
            label: " Vacaciones",
            route: "vacation",
            icon: this.iconsService.getIcon("icDashboard"),
          },
          {
            type: "link",
            label: " Fichajes",
            route: "manual-singing",
            icon: this.iconsService.getIcon("icDashboard"),
          },
          {
            type: "link",
            label: " Mapa Fichajes",
            route: "map-Layout",
            icon: this.iconsService.getIcon("icDashboard"),
          },
        ],
      },
    ];
  }
}
