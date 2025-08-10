import { Component, Inject, OnInit } from "@angular/core";
import icClose from "@iconify/icons-ic/twotone-close";
import * as configs from "../../../../../static-data/configs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AlertService } from "@shared/services/alert.service";
import { ComboSelectService } from "@shared/services/combos.service";
import { UsercompanyService } from "../../services/user-company.service";

@Component({
  selector: 'vex-user-company-manage',
  templateUrl: './user-company-manage.component.html',
  styleUrls: ['./user-company-manage.component.scss']
})
export class UserCompanyManageComponent implements OnInit {

  icClose = icClose;
  configs = configs;
  users: { label: string; value: string }[] = [];
  companies: { label: string; value: string }[] = [];
  departments: { label: string; value: string }[] = [];

  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _userCompanyService: UsercompanyService,
    public _dialogRef: MatDialogRef<UserCompanyManageComponent>
  ) {
    this.initForm();
  }

  // Código TypeScript para inicializar el formulario
initForm(): void {
  this.form = this._fb.group({
    userCompanyId: [null],
    userId: ["", [Validators.required]],
    companyId:["", [Validators.required]],
    departmentId: ["", [Validators.required]],
    state: ["", [Validators.required]],
  });
}


  ngOnInit(): void {
    this.loadUsers();
    this.loadCompanies();
    this.loadDepartments();
    if (this.data != null) {
      this.UserCompanyById(this.data.data.userCompanyId);
    }
  }

  UserCompanyById(userCompanyId: number): void {
    this._userCompanyService.UserCompanyById(userCompanyId).subscribe((resp) => {           
      this.form.reset({   
        userCompanyId: resp.userCompanyId,
        userId: resp.userId,  
        companyId: resp.companyId,
        departmentId: resp.departmentId,
        state: resp.state,
      });
    });
  }

  UserCompanyRegister(): void {
    this._userCompanyService
      .UserCompanyRegister(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }

  UserCompanyEdit(userCompanyId: number): void {
    this._userCompanyService
      .UserCompanyEdit(userCompanyId, this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }

  UserCompanySave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((control) => {
        control.markAsTouched();
      });
    }

    const userCompanyControl = this.form.get("userCompanyId");
    const userCompanyId = userCompanyControl ? userCompanyControl.value : null; // Agregamos un control de seguridad

    if (userCompanyId > 0) {
      this.UserCompanyEdit(userCompanyId);
    } else {
      this.UserCompanyRegister();
    }
  }
  

  loadUsers(): void {
    this._userCompanyService.UserSelect().subscribe((users: any[]) => {
      this.users = users.map((user) => ({
        label: user.description,
        value: user.id,
      }));
    });
  }

  loadCompanies(): void {
    this._userCompanyService.CompanySelect().subscribe((companies: any[]) => {
      this.companies = companies.map((company) => ({
        label: company.description,
        value: company.id,
      }));
    });
  }

  loadDepartments(): void {
    this._userCompanyService.DepartmentSelect().subscribe((departaments: any[]) => {
      this.departments = departaments.map((department) => ({
        label: department.description,
        value: department.id,
      }));
    });
  }

  
}
