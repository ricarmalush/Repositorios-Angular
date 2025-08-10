import { Component, OnInit } from '@angular/core';
import { CustomTitleService } from '@shared/services/custom-title.service';
import { VacationService } from '../../services/vacation.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AlertService } from '@shared/services/alert.service';
import { componentSettings } from './vacation-list-config';
import { DateRange, FiltersBox } from '@shared/models/search-options.interface';
import Swal from 'sweetalert2';
import { VacationResponse } from '../../models/vacation-response.interface';
import { VacationManageComponent } from '../vacation-manage/vacation-manage.component';

@Component({
  selector: 'vex-vacation-list',
  templateUrl: './vacation-list.component.html',
  styleUrls: ['./vacation-list.component.scss']
})
export class VacationListComponent implements  OnInit {

  component

  constructor(
    customTitle: CustomTitleService,
    public _vacationService: VacationService,
    public _dialog: MatDialog,
    public _alert: AlertService
  ) {
    customTitle.set("Gestión de Vacaciones");
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
      .open(VacationManageComponent, {
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
    let vacation = e.row;

    switch (action) {
      case "edit":
        this.VacationEdit(vacation);
        break;
      case "remove":
        this.VacationRemove(vacation);
        break;
    }
    return false;
  }

  VacationEdit(row: VacationResponse) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = row;

    let dialogRef = this._dialog.open(VacationManageComponent, {
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

  VacationRemove(vacation: any) {
    Swal.fire({
      title: `¿Realmente deseas eliminar el día de vacación ${vacation.fullName}?`,
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
        this._vacationService.VacationRemove(vacation.vacationId)
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

  get getDownloadUrlSchedule() {
    return `Vacation?Download=True`;
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
