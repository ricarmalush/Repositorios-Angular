import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import icClose from "@iconify/icons-ic/twotone-close";
import * as configs from "../../../../../static-data/configs";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '@shared/services/alert.service';
import { AnnualleaveService } from '../../services/annualleave.service';

@Component({
  selector: 'vex-annualleave-manage',
  templateUrl: './annualleave-manage.component.html',
  styleUrls: ['./annualleave-manage.component.scss']
})
export class AnnualleaveManageComponent implements OnInit {
  icClose = icClose;
  configs = configs;
  users: { label: string; value: string }[] = [];

  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _annualleaveService: AnnualleaveService,
    public _dialogRef: MatDialogRef<AnnualleaveManageComponent>
  ) {
    this.initForm();
  }

  initForm(): void {
    this.form = this._fb.group({
      annualLeaveId: [0],  // Añadido para manejar el ID de la entrada
      userId: [0, [Validators.required]],
      anyo: ["", [Validators.required]],
      daysAvailable:["", [Validators.required]],
      state: ["", [Validators.required]],
    });
  }


  ngOnInit(): void {
    if (this.data != null) {
      this.AnnualLeaveById(this.data.data.annualLeaveId);
    }
    this.loadUsers();
  }

  loadUsers(): void {
    this._annualleaveService.UserSelect().subscribe((users: any[]) => {
      this.users = users.map((user) => ({
        label: user.description,
        value: user.id,
      }));
    });
  }

  AnnualLeaveById(annualLeaveId: number): void {
    this._annualleaveService.AnnualLeaveById(annualLeaveId).subscribe((resp) => {
      this.form.reset({
        annualLeaveId: resp.annualLeaveId,
        anyo: resp.anyo,
        daysAvailable: resp.daysAvailable,
        userId: resp.userId,
        state: resp.state,
      });
    });
  }

  AnnualLeaveaveSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const annualLeaveId = this.form.get("annualLeaveId").value;

    if (annualLeaveId > 0) {
      this.AnnualLeaveEdit(annualLeaveId);
    } else {
      this.AnnualLeaveRegister();
    }
  }

  AnnualLeaveRegister(): void {
    this._annualleaveService
      .AnnualLeaveRegister(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }

  AnnualLeaveEdit(annualLeaveId: number): void {
    this._annualleaveService
      .AnnualLeaveEdit(annualLeaveId, this.form.value)
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
