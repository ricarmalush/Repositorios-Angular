import { Component, Inject, OnInit } from '@angular/core';
import icClose from "@iconify/icons-ic/twotone-close";
import * as configs from "../../../../../static-data/configs";
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from '@shared/services/alert.service';
import { UserRoleService } from '../../services/user-role.service';

@Component({
  selector: 'vex-user-role-manage',
  templateUrl: './user-role-manage.component.html',
  styleUrls: ['./user-role-manage.component.scss']
})
export class UserRoleManageComponent implements OnInit {

  icClose = icClose;
  configs = configs;
  users: { label: string, value: string }[] = [];
  roles: { label: string, value: string }[] = [];

  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _userRoleService: UserRoleService,
    public _dialogRef: MatDialogRef<UserRoleManageComponent>
    
  ) {
    this.initForm();
  }

  initForm(): void {
    this.form = this._fb.group({
      userRoleId: [null],
      roleId: ["", [Validators.required]],
      userId: ['', [Validators.required]],
      state: ["", [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadRoles();
    if (this.data != null) {
      this.UseRoleById(this.data.data.userRoleId);
    }
  }

  UseRoleById(userRoleId: number): void {
    this._userRoleService.UserRoleById(userRoleId).subscribe((resp) => {
      this.form.reset({
        userRoleId: resp.userRoleId,
        userId: resp.userId,
        roleId: resp.roleId,
        roleName: resp.roleName,
        user: resp.user,
        state: resp.state,        
      });
    });
  }

  UserRoleSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
    
      const userRoleControl = this.form.get("userRoleId");
      const userRoleId = userRoleControl ? userRoleControl.value : null; // Agregamos un control de seguridad

    if (userRoleId > 0) {
      this.UserRoleEdit(userRoleId);
    } else {
      this.UserRoleRegister();
    }
  }

  UserRoleRegister(): void {
    let formData = this.form.value;

  // Si userRoleId no está configurado, lo removemos
  if (formData.userRoleId === null) {
    delete formData.userRoleId;
  }

    this._userRoleService
      .UserRoleRegister(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }

  UserRoleEdit(userRoleId: number): void {
    this._userRoleService
      .UserRoleEdit(userRoleId, this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }

  loadUsers(): void {
    this._userRoleService.UserSelect().subscribe(
      (users: any[]) => {
        this.users = users.map(user => ({ label: user.description, value: user.id }));
      }
    )
  }

  loadRoles(): void {
    this._userRoleService.RoleSelect().subscribe(
      (roles: any[]) => {
        this.roles = roles.map(role => ({ label: role.description, value: role.id }));
      }
    )
  }


}


