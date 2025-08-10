import { Component, Inject, OnInit } from "@angular/core";
import icClose from "@iconify/icons-ic/twotone-close";
import * as configs from "../../../../../static-data/configs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AlertService } from "@shared/services/alert.service";
import { Observable } from "rxjs/internal/Observable";
import { tap } from "rxjs/operators";
import { CompanyService } from "../../services/company.service";
import { ComboSelectService } from "@shared/services/combos.service";

@Component({
  selector: "vex-company-manage",
  templateUrl: "./company-manage.component.html",
  styleUrls: ["./company-manage.component.scss"],
})
export class CompanyManageComponent implements OnInit {
  icClose = icClose;
  configs = configs;
  countries: { label: string; value: string }[] = [];
  provinces: { label: string; value: string }[] = [];
  communities: { label: string; value: string }[] = [];
  documentTypes: { label: string; value: string }[] = [];

  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _companyService: CompanyService,
    private _comboSelectService: ComboSelectService,
    public _dialogRef: MatDialogRef<CompanyManageComponent>
  ) {
    this.initForm();
  }

  // Código TypeScript para inicializar el formulario
initForm(): void {
  this.form = this._fb.group({
    companyId: [null],
    countryId: ["", [Validators.required]],
    provinceId:["", [Validators.required]],
    communityId: ["", [Validators.required]],
    documentTypeId: ["", [Validators.required]],
    name: ["", [Validators.required]],
    numDocument:  ["", [Validators.required]],
    address:[null],
    email:  [null],
    telephone: [null],
    fax: [null],
    state: ["", [Validators.required]],
  });
}


  ngOnInit(): void {
    this.loadCountries();
    this.loadDocumentType();
    if (this.data != null) {
      this.CompanyById(this.data.data.companyId);
    }
  }

  CompanyById(companyId: number): void {
    this._companyService.CompanyById(companyId).subscribe((resp) => {
      if (resp.countryId && resp.provinceId){
        this.loadProvincesByCountries(resp.countryId).subscribe(() => {
          this.loadProvincesByCommunity(resp.provinceId).subscribe(() => {
            // Buscamos la provincia correspondiente en la lista de provincias y establecemos su nombre en el formulario
            const selectedProvince = this.provinces.find((province) => province.value === resp.provinceId.toString());
            const selectedCommunity = this.communities.find((community) => community.value === resp.communityId.toString());
            if (selectedProvince) {
              this.form.get("provinceId").setValue(selectedProvince.value);
              this.form.patchValue({
                companyId: resp.companyId,
                countryId: resp.countryId,
                provinceId: selectedProvince.value,
                communityId: selectedCommunity.value,
                documentTypeId: resp.documentTypeId,
                name: resp.companyName,
                documentName: resp.documentName,
                numDocument: resp.numDocument,
                address: resp.address,
                email: resp.email,
                fax: resp.fax,
                telephone: resp.telephone,
                state: resp.state,
              });
            }
          });
        });
      }
    });
  }

  CompanyRegister(): void {
    this._companyService
      .CompanyRegister(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }

handleValidationErrors(validationErrors: any): void {
  for (const key in validationErrors) {
      if (validationErrors.hasOwnProperty(key)) {
          const control = this.form.get(key);
          if (control) {
              control.setErrors({ serverError: validationErrors[key] });
          }
      }
  }
  this._alert.warn("Atención", "Se han producido errores de validación. Por favor, revise el formulario.");
}

  CompanyEdit(companyId: number): void {
    this._companyService
      .CompanyEdit(companyId, this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }

  CompanySave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((control) => {
        control.markAsTouched();
      });
    }

    const companyControl = this.form.get("companyId");
    const communityId = companyControl ? companyControl.value : null; // Agregamos un control de seguridad

    if (communityId > 0) {
      this.CompanyEdit(communityId);
    } else {
      this.CompanyRegister();
    }
  }

  loadCountries(): void {
    this._companyService.CountriesSelect().subscribe((countries: any[]) => {
      this.countries = countries.map((country) => ({
        label: country.name,
        value: country.countryId,
      }));
    });
  }

  loadProvincesByCountries(countryId: number): Observable<any> {
    return this._companyService.ProvinceByCountrySelect(countryId).pipe(
      tap((response: any) => {
        if (response?.data) {
          this.provinces = response.data.map((province) => ({
            label: province.provinceName,
            value: province.provinceId.toString(),
          }));
        } else {
          this.provinces = [];
        }
      })
    );
  }

  onSelectCountry(countryId: number): void {
    this.loadProvincesByCountries(countryId).subscribe();
  }

  loadProvincesByCommunity(provinceId: number): Observable<any> {
    return this._companyService.ProvincesByCommunitySelect(provinceId).pipe(
      tap((response: any) => {
        this.communities = response.data.map((community) => ({
          label: community.communityName,
          value: community.comunityId.toString(),
        }));
      })
    );
  }

  onSelectProvince(provinceId: number): void {
    this.loadProvincesByCommunity(provinceId).subscribe();
  }

  loadDocumentType(): void {
    this._comboSelectService
      .DocumentTypeSelect()
      .subscribe((documentTypes: any[]) => {
        this.documentTypes = documentTypes.map((documentType) => ({
          label: documentType.description,
          value: documentType.id,
        }));
      });
  }
}
