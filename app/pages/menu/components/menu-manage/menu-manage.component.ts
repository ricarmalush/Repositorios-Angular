import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import icClose from "@iconify/icons-ic/twotone-close";
import * as configs from "../../../../../static-data/configs";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '@shared/services/alert.service';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'vex-menu-manage',
  templateUrl: './menu-manage.component.html',
  styleUrls: ['./menu-manage.component.scss']
})
export class MenuManageComponent implements OnInit {

  icClose = icClose;
  configs = configs;

  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _menuService: MenuService,
    public _dialogRef: MatDialogRef<MenuManageComponent>
  ) {
    this.initForm();
  }

  initForm(): void {
    this.form = this._fb.group({
      menuId: [null],
      name: ["", [Validators.required]],
      state: ["", [Validators.required]],
    });
  }


  ngOnInit(): void {
    if (this.data != null) {
      this.MenuById(this.data.data.menuId);
    }
  }

  MenuById(menuId: number): void {
    this._menuService.MenuById(menuId).subscribe((resp) => {           
      this.form.reset({     
        name: resp.name,
        state: resp.state,
      });
    });
  }

  MenuSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const menuControl = this.form.get("menuId");
    const menuId= menuControl ? menuControl.value : null; 

    if (menuId > 0) {
      this.MenuEdit(menuId);
    } else {
      this.MenuRegister();
    }
  }

  MenuRegister(): void {
    this._menuService
      .MenuRegister(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }


  MenuEdit(menuId: number): void {
    this._menuService
      .MenuEdit(menuId, this.form.value)
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
