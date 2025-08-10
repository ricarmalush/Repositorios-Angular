import { Component, Inject, OnInit } from '@angular/core';
import icClose from "@iconify/icons-ic/twotone-close";
import * as configs from "../../../../../static-data/configs";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from '@shared/services/alert.service';
import { ProvinceService } from '../../services/province.service';

@Component({
  selector: 'vex-province-manage',
  templateUrl: './province-manage.component.html',
  styleUrls: ['./province-manage.component.scss']
})
export class ProvinceManageComponent implements OnInit {
  icClose = icClose;
  configs = configs;
  countries: { label: string, value: string }[] = [];

  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _provinceService: ProvinceService,
    public _dialogRef: MatDialogRef<ProvinceManageComponent>
    
  ) {
    this.initForm();
  }

  initForm(): void {
    this.form = this._fb.group({
      name: ["", [Validators.required]],
      state: ["", [Validators.required]],
      countryId: ['', [Validators.required]],
      provinceId: [null],
    });
  }

  ngOnInit(): void {
    this.loadCountries();
    if (this.data != null) {
      this.ProvinceById(this.data.data.provinceId);
    }
  }


  ProvinceById(provinceId: number): void {
    this._provinceService.ProvinceById(provinceId).subscribe((resp) => {
      this.form.reset({
        provinceId: resp.provinceId,
        name: resp.provinceName,
        state: resp.state,
        countryId: resp.countryId
      });
    });
  }

  ProvinceSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
    
      const provinceControl = this.form.get("provinceId");
      const provinceId = provinceControl ? provinceControl.value : null; // Agregamos un control de seguridad

    if (provinceId > 0) {
      this.ProvinceEdit(provinceId);
    } else {
      this.ProvinceRegister();
    }
  }

  ProvinceRegister(): void {
    this._provinceService
      .ProvinceRegister(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }

  ProvinceEdit(provinceId: number): void {
    this._provinceService
      .ProvinceEdit(provinceId, this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }

  loadCountries(): void {
    this._provinceService.CountriesSelect().subscribe(
      (countries: any[]) => {
        this.countries = countries.map(country => ({ label: country.name, value: country.countryId }));
      }
    )
  }


}
