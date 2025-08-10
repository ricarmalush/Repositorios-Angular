import { Component, Inject, OnInit } from '@angular/core';
import icClose from "@iconify/icons-ic/twotone-close";
import * as configs from "../../../../../static-data/configs";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from '@shared/services/alert.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'vex-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss']
})
export class UserManageComponent implements OnInit {
  icClose = icClose;
  configs = configs;

  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _userService: UserService,
    public _dialogRef: MatDialogRef<UserManageComponent>
  ) {
    this.initForm();
  }

  initForm(): void {
    this.form = this._fb.group({
      userID: [null],
      name: ["", [Validators.required]],
      lastname1: ["", [Validators.required]],
      lastname2: ["", [Validators.required]],
      numDocument: ["", [Validators.required]],
      address: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      movil: ["", [Validators.required]],
      telephone: ["", [Validators.required]],
      userName: ["", [Validators.required]],
      password: ["", [Validators.required]],
      state: ["", [Validators.required]],
      authType: ["", [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.data != null) {
      this.UserById(this.data.data.userID);
    }
  }

  UserById(userID: number): void {
    this._userService.UserById(userID).subscribe((resp) => {
      this.form.patchValue({
        userID: resp.userID,
        name: resp.name,
        numDocument: resp.numDocument,
        lastname1: resp.lastName1,
        lastname2: resp.lastName2,
        address: resp.address,
        email: resp.email,
        movil: resp.movil,
        telephone: resp.telephone,
        authType: resp.authType,
        userName: resp.userName,
        password: resp.password,
        state: resp.state
      });
    });
  }

  UserSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
    
    const userControl = this.form.get("userID");
    const userID = userControl ? userControl.value : null; 

    if (userID > 0) {
      this.UserEdit(userID);
    } else {
      this.UserRegister();
    }
  }

  UserRegister(): void {
    this._userService
      .UserRegister(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          console.log("Register: ", resp)
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }

  UserEdit(userID: number): void {
    this._userService
      .UserEdit(userID, this.form.value)
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
