import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import icClose from "@iconify/icons-ic/twotone-close";
import * as configs from "../../../../../static-data/configs";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '@shared/services/alert.service';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'vex-role-manage',
  templateUrl: './role-manage.component.html',
  styleUrls: ['./role-manage.component.scss']
})

export class RoleManageComponent implements OnInit {
  icClose = icClose;
  configs = configs;

  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _roleService: RoleService,
    public _dialogRef: MatDialogRef<RoleManageComponent>
  ) {
    this.initForm();
  }

  initForm(): void {
    this.form = this._fb.group({
      roleId: [0, [Validators.required]],
      name: ["", [Validators.required]],
      state: ["", [Validators.required]],
    });
  }


  ngOnInit(): void {
    if (this.data != null) {
      this.RoleById(this.data.data.roleId);
    }
  }

  RoleById(roleId: number): void {
    this._roleService.RoleById(roleId).subscribe((resp) => {
      this.form.reset({
        roleId: resp.roleId,
        name: resp.name,
        state: resp.state,
      });
    });
  }

  RoleSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const roleId = this.form.get("roleId").value;

    if (roleId > 0) {
      this.RoleEdit(roleId);
    } else {
      this.RoleRegister();
    }
  }

  RoleRegister(): void {
    this._roleService
      .RoleRegister(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }

  RoleEdit(roleId: number): void {
    this._roleService
      .RoleEdit(roleId, this.form.value)
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
