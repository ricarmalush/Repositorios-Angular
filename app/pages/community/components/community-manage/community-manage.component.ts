import { Component, Inject, OnInit } from '@angular/core';
import icClose from "@iconify/icons-ic/twotone-close";
import * as configs from "../../../../../static-data/configs";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from '@shared/services/alert.service';
import { CommunityService } from '../../services/community.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'vex-community-manage',
  templateUrl: './community-manage.component.html',
  styleUrls: ['./community-manage.component.scss']
})
export class CommunityManageComponent implements OnInit {
  [x: string]: any;
  icClose = icClose;
  configs = configs;
  countries: { label: string, value: string }[] = [];
  provinces: { label: string, value: string }[] = [];

  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _communityService: CommunityService,
    public _dialogRef: MatDialogRef<CommunityManageComponent>
    
  ) {
    this.initForm();
  }

  initForm(): void {
    this.form = this._fb.group({
      name: ["", [Validators.required]],
      state: ["", [Validators.required]],
      countryId: ['', Validators.required],
      provinceId: ['', Validators.required],
      communityId: [null],
      cp: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCountries();
      if (this.data != null) {
        this.CommunityById(this.data.data.communityId);
      }
    };

    CommunityById(communityId: number): void {
      this._communityService.CommunityById(communityId).subscribe((resp) => {
        if (resp.countryId) {
          this.loadProvincesByCountries(resp.countryId).subscribe(() => {

            // Buscamos la provincia correspondiente en la lista de provincias y establecemos su nombre en el formulario
            const selectedProvince = this.provinces.find(province => province.value === resp.provinceId.toString());

            if (selectedProvince) {
              this.form.get('provinceId').setValue(selectedProvince.value);
              this.form.patchValue({
                countryId: resp.countryId,
                communityId: resp.communityId,
                name: resp.communityName,
                state: resp.state,
                cp: resp.cp
              });
            }
          });
        }
      });
    }
    
  
  CommunityRegister(): void {
    this._communityService
      .CommunityRegister(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }

  CommunityEdit(communityId: number): void {
    this._communityService
      .CommunityEdit(communityId, this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }

  CommunitySave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((control) => {
        control.markAsTouched();
      });
    }

  const communityControl = this.form.get("communityId");
  const communityId = communityControl ? communityControl.value : null; // Agregamos un control de seguridad

  if (communityId > 0) {
    this.CommunityEdit(communityId);
  } else {
    this.CommunityRegister();
  }
}

  loadCountries(): void {
    this._communityService.CountriesSelect().subscribe(
      (countries: any[]) => {
        this.countries = countries.map(country => ({ label: country.name, value: country.countryId }));
      }
    );
  }

  loadProvincesByCountries(countryId: number): Observable<any> {
    return this._communityService.ProvinceByCountrySelect(countryId).pipe(
      tap((response: any) => {
        this.provinces = response.data.map(province => ({ label: province.provinceName, value: province.provinceId.toString() }));
      })
    );
  }

  onSelectCountry(countryId: number): void {
    this.loadProvincesByCountries(countryId).subscribe();
  }


}
