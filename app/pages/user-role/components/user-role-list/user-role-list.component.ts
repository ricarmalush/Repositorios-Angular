import { Component, OnInit } from '@angular/core';
import { CustomTitleService } from '@shared/services/custom-title.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DateRange, FiltersBox } from '@shared/models/search-options.interface';
import Swal from 'sweetalert2';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { AlertService } from '@shared/services/alert.service';
import { UserRoleService } from '../../services/user-role.service';
import { UserRoleManageComponent } from '../user-role-manage/user-role-manage.component';
import { UserRoleResponse } from '../../models/user-role-response.interface';
import { componentSettings } from './user-role-list-config';


@Component({
  selector: 'vex-user-role-list',
  templateUrl: './user-role-list.component.html',
  styleUrls: ['./user-role-list.component.scss'],
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})
export class UserRoleListComponent implements OnInit {

  component

  constructor(
    customTitle: CustomTitleService,
    public _userRoleService: UserRoleService,
    public _dialog: MatDialog,
    public _alert: AlertService
  ) {
    customTitle.set("UserRoles");
  }

  ngOnInit(): void {
    this.component = componentSettings
  }

  setData(value: number) {
    this.component.filters.stateFilter = value;
    this.formatGetInputs();
  }

  search(data: FiltersBox) {
    this.component.filters.numFilter = data.searchValue;
    this.component.filters.textFilter = data.searchData;
    this.formatGetInputs();
  }

  searchDateRange(date: DateRange) {
    this.component.filters.startDate = date.startDate;
    this.component.filters.endDate = date.endDate;
    this.formatGetInputs();
  }

  resetFilters() {
    this.component.filters = { ...this.component.resetFilters };
    this.formatGetInputs();
  }

  openDialogRegister() {
    this._dialog
      .open(UserRoleManageComponent, {
        disableClose: true,
        width: "400px",
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.setGetInputsProviders(true);
        }
      });
  }

  rowClick(e: any) {
    let action = e.action;
    let userRole = e.row;

    switch (action) {
      case "edit":
        this.UserRoleEdit(userRole);
        break;
      case "remove":
        this.UserRoleRemove(userRole);
        break;
    }
    return false;
  }

  UserRoleEdit(row: UserRoleResponse) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = row;

    let dialogRef = this._dialog.open(UserRoleManageComponent, {
      data: dialogConfig,
      disableClose: true,
      width: "400px",
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.setGetInputsProviders(true);
      }
    });
  }

  UserRoleRemove(userRole: any) {
    Swal.fire({
      title: `¿Realmente deseas eliminar la Usuario ${userRole.user}?`,
      text: "Se borrará de forma permanente!",
      icon: "warning",
      showCancelButton: true,
      focusCancel: true,
      confirmButtonColor: "rgb(210, 155, 253)",
      cancelButtonColor: "rgb(79, 109, 253)",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      width: 430,
    }).then((result) => {
      if (result.isConfirmed) {
        this._userRoleService.UserRoleRemove(userRole.userRoleId)
        .subscribe({
          next: (response) => {
            if (response.isSuccess) {
              this.setGetInputsProviders(true);
              this._alert.success("Excelente", response.message);
            } else {
              this._alert.warn("Atención", response.message);
            }
          },
        });
      } 
    });
  }

  setGetInputsProviders(refresh: boolean) {
    this.component.filters.refresh = refresh;
    this.formatGetInputs();
  }

  get getDownloadUrl() {
    return `UserRole?Download=True`;
  }

  formatGetInputs() {
    let str = "";

    if (this.component.filters.textFilter != null) {
      str += `&numFilter=${this.component.filters.numFilter}&textFilter=${this.component.filters.textFilter}`;
    }

    if (this.component.filters.stateFilter != null) {
      str += `&stateFilter=${this.component.filters.stateFilter}`;
    }

    if (
      this.component.filters.startDate != "" &&
      this.component.filters.endDate != ""
    ) {
      str += `&startDate=${this.component.filters.startDate}`;
      str += `&endDate=${this.component.filters.endDate}`;
    }

    if (this.component.filters.refresh) {
      let random = Math.random();
      str += `&refresh=${random}`;
      this.component.filters.refresh = false;
    }

    this.component.getInputs = str;
  }


}

