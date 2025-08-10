import { Component, Inject, OnInit } from '@angular/core';
import icClose from "@iconify/icons-ic/twotone-close";
import * as configs from "../../../../../static-data/configs";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from '@shared/services/alert.service';
import { MenuRoleService } from '../../services/menurole.service';
import { ComboSelectService } from '@shared/services/combos.service';

@Component({
  selector: 'vex-menu-role-manage',
  templateUrl: './menu-role-manage.component.html',
  styleUrls: ['./menu-role-manage.component.scss']
})
export class MenuRoleManageComponent implements OnInit {

  icClose = icClose;
  configs = configs;
  menus: { label: string, value: string }[] = [];
  roles: { label: string, value: string }[] = [];

  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _menuRoleService: MenuRoleService,
    private _comboSelectService: ComboSelectService,
    public _dialogRef: MatDialogRef<MenuRoleManageComponent>
    
  ) {
    this.initForm();
  }

  initForm(): void {
    this.form = this._fb.group({
      menuRoleId: [null], 
      menuId: ['', [Validators.required]],
      roleId: ['', [Validators.required]],
      state: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadMenu();
    this.loadRole();
    if (this.data != null) {
      this.MenuRoleById(this.data.data.menuRoleId);
    }
  }


  MenuRoleById(menuRoleId: number): void {
    this._menuRoleService.MenuRoleById(menuRoleId).subscribe((resp) => {
      this.form.reset({
        menuRoleId: resp.menuRoleId,
        menuId: resp.menuId,
        roleId: resp.roleId,
        state: resp.state,
      });
    });
  }

  MenuRoleSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
    
      const userControl = this.form.get("menuRoleId");
      const menuRoleId = userControl ? userControl.value : null; 

    if (menuRoleId > 0) {
      this.MenuRoleEdit(menuRoleId);
    } else {
      this.MenuRoleRegister();
    }
  }

  MenuRoleRegister(): void {
    this._menuRoleService
      .MenuRoleRegister(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }

  MenuRoleEdit(menuRoleId: number): void {
    this._menuRoleService
      .MenuRoleEdit(menuRoleId, this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }

  loadMenu(): void {
    this._comboSelectService.MenuSelect().subscribe(
      (menus: any[]) => {
        this.menus = menus.map(menu => ({ label: menu.description, value: menu.id }));
      }
    )
  }

  loadRole(): void {
    this._comboSelectService.RoleSelect().subscribe(
      (roles: any[]) => {
        this.roles = roles.map(role => ({ label: role.description, value: role.id }));
      }
    )
  }


}
