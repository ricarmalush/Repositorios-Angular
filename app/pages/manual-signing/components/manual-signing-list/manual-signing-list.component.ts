import { Component, OnInit } from '@angular/core';
import { CustomTitleService } from '@shared/services/custom-title.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AlertService } from '@shared/services/alert.service';
import { DateRange, FiltersBox } from '@shared/models/search-options.interface';
import Swal from 'sweetalert2';
import { ManualSigningService } from '../../services/manual-signing.service';
import { componentSettings } from './manual-signing-list-config';
import { ManualSigningManageComponent } from '../manual-signing-manage/manual-signing-manage.component';
import { ManualSigningResponse } from '../../models/manual-signing-response.interface';

@Component({
  selector: 'vex-manual-signing-list',
  templateUrl: './manual-signing-list.component.html',
  styleUrls: ['./manual-signing-list.component.scss']
})
export class ManualSigningListComponent implements  OnInit {

  component

  constructor(
    customTitle: CustomTitleService,
    public _signingService: ManualSigningService,
    public _dialog: MatDialog,
    public _alert: AlertService
  ) {
    customTitle.set("Gestión de Fichajes");
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
      .open(ManualSigningManageComponent, {
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
    let signing = e.row;

    switch (action) {
      case "edit":
        this.SigningEdit(signing);
        break;
      case "remove":
        this.SigningRemove(signing);
        break;
    }
    return false;
  }

  SigningEdit(row: ManualSigningResponse) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = row;

    let dialogRef = this._dialog.open(ManualSigningManageComponent, {
      data: dialogConfig,
      disableClose: true,
      width: "600px",
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.setGetInputsProviders(true);
      }
    });
  }

  SigningRemove(signingUp: any) {
    Swal.fire({
      title: `¿Realmente deseas eliminar el fichaje ${signingUp.type}?`,
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
        this._signingService.SigningRemove(signingUp.signingUpId)
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
    return `SigningUp?Download=True`;
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
