import { Component, Inject, OnInit } from "@angular/core";
import icClose from "@iconify/icons-ic/twotone-close";
import * as configs from "../../../../../static-data/configs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AlertService } from "@shared/services/alert.service";
import { HolidayService } from "../../services/holiday.service";
import { componentSettings } from "../holiday-list/holiday-list-config";


@Component({
  selector: 'vex-holiday-manage',
  templateUrl: './holiday-manage.component.html',
  styleUrls: ['./holiday-manage.component.scss'],
})
export class HolidayManageComponent implements OnInit {

  icClose = icClose;
  configs = configs;
  component;


  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, // Define el tipo correcto de 'data'
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _holidayService: HolidayService,
    public _dialogRef: MatDialogRef<HolidayManageComponent>
  ) {
    this.initForm();
  }

  initForm(): void {
    this.form = this._fb.group({
      holidayId: [0, [Validators.required]],
      holidayName: ["", [Validators.required]],
      state: ["", [Validators.required]],
      holidayDate: ['', Validators.required],
    });

  }

  ngOnInit(): void {
    if (this.data != null) {
      this.HolidayById(this.data.data.holidayId);
    }
    this.component = componentSettings;

  }

  HolidayById(holidayId: number): void {
    this._holidayService.HolidayById(holidayId).subscribe((resp) => {
        const holidayDate = new Date(resp.holidayDate); // Convertir a Date
        this.form.reset({
            holidayId: resp.holidayId,
            holidayName: resp.holidayName,
            holidayDate: this.formatDate(holidayDate), // Formatear fecha
            state: resp.state,
        });
    });
}

   formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
}

  HolidaySave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAsTouched();
      });
    }

    const holidayId = this.form.get("holidayId")?.value;

    if (holidayId > 0) {
      this.HolidayEdit(holidayId);
    } else {
      this.HolidayRegister();
    }
  }

  HolidayRegister(): void {
    this._holidayService
      .HolidayRegister(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }

  HolidayEdit(holidayId: number): void {
    this._holidayService
      .HolidayEdit(holidayId, this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }

  
  
}
