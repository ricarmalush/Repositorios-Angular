import { Component, Inject, OnInit } from '@angular/core';
import icClose from "@iconify/icons-ic/twotone-close";
import * as configs from "../../../../../static-data/configs";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DepartmentService } from '../../services/department.service';
import { AlertService } from '@shared/services/alert.service';

@Component({
  selector: 'vex-department-manage',
  templateUrl: './department-manage.component.html',
  styleUrls: ['./department-manage.component.scss']
})
export class DepartmentManageComponent implements OnInit {
  icClose = icClose;
  configs = configs;

  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _departmentService: DepartmentService,
    public _dialogRef: MatDialogRef<DepartmentManageComponent>
  ) {
    this.initForm();
  }

  initForm(): void {
    this.form = this._fb.group({
      departmentId: [0, [Validators.required]],
      name: ["", [Validators.required]],
      state: ["", [Validators.required]],
    });
  }


  ngOnInit(): void {
    if (this.data != null) {
      this.DepartmentById(this.data.data.departmentId);
    }
  }

  DepartmentById(departmentId: number): void {
    this._departmentService.DepartmentById(departmentId).subscribe((resp) => {
      this.form.reset({
        departmentId: resp.departmentId,
        name: resp.name,
        state: resp.state,
      });
    });
  }

  DepartmentSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const departmentId = this.form.get("departmentId").value;

    if (departmentId > 0) {
      this.DepartmentEdit(departmentId);
    } else {
      this.DepartmentRegister();
    }
  }

  DepartmentRegister(): void {
    this._departmentService
      .DepartmentRegister(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }

  DepartmentEdit(departmentId: number): void {
    this._departmentService
      .DepartmentEdit(departmentId, this.form.value)
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

