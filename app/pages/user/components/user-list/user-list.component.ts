import { Component, OnInit } from '@angular/core';
import { CustomTitleService } from '@shared/services/custom-title.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DateRange, FiltersBox } from '@shared/models/search-options.interface';
import Swal from 'sweetalert2';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { AlertService } from '@shared/services/alert.service';
import { componentSettings } from './user-list-config';
import { UserService } from '../../services/user.service';
import { UserManageComponent } from '../user-manage/user-manage.component';
import { UserResponse } from '../../models/user-response.interface';

@Component({
  selector: 'vex-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms]
})
export class UserListComponent implements OnInit {

  component

  constructor(
    customTitle: CustomTitleService,
    public _userService: UserService,
    public _dialog: MatDialog,
    public _alert: AlertService
  ) {
    customTitle.set("Usuarios");
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
      .open(UserManageComponent, {
        disableClose: true,
        width: "600px",
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
    let user = e.row;

    switch (action) {
      case "edit":
        this.UserEdit(user);
        break;
      case "remove":
        this.UserRemove(user);
        break;
    }
    return false;
  }

  UserEdit(row: UserResponse) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = row;

    let dialogRef = this._dialog.open(UserManageComponent, {
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

  UserRemove(user: any) {
    Swal.fire({
      title: `¿Realmente deseas eliminar el usuario ${user.name}?`,
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
        this._userService.UserRemove(user.userID)
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
    return `User?Download=True`;
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

