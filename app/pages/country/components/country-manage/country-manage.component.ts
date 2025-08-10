import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import icClose from "@iconify/icons-ic/twotone-close";
import * as configs from "../../../../../static-data/configs";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '@shared/services/alert.service';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'vex-country-manage',
  templateUrl: './country-manage.component.html',
  styleUrls: ['./country-manage.component.scss']
})
export class CountryManageComponent implements OnInit {
  icClose = icClose;
  configs = configs;

  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _countryService: CountryService,
    public _dialogRef: MatDialogRef<CountryManageComponent>
  ) {
    this.initForm();
  }

  initForm(): void {
    this.form = this._fb.group({
      countryId: [0, [Validators.required]],
      name: ["", [Validators.required]],
      state: ["", [Validators.required]],
    });
  }


  ngOnInit(): void {
    if (this.data != null) {
      this.CountryById(this.data.data.countryId);
    }
  }

  CountryById(CountryId: number): void {
    this._countryService.CountryById(CountryId).subscribe((resp) => {
      this.form.reset({
        countryId: resp.countryId,
        name: resp.name,
        state: resp.state,
      });
    });
  }

  CountrySave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const countryId = this.form.get("countryId").value;

    if (countryId > 0) {
      this.CountryEdit(countryId);
    } else {
      this.CountryRegister();
    }
  }

  CountryRegister(): void {
    this._countryService
      .CountryRegister(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }

  CountryEdit(countryId: number): void {
    this._countryService
      .CountryEdit(countryId, this.form.value)
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
