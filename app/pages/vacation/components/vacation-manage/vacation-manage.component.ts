import { Component, Inject, OnInit } from '@angular/core';
import icClose from "@iconify/icons-ic/twotone-close";
import * as configs from "../../../../../static-data/configs";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from '@shared/services/alert.service';
import { VacationService } from '../../services/vacation.service';

@Component({
  selector: 'vex-vacation-manage',
  templateUrl: './vacation-manage.component.html',
  styleUrls: ['./vacation-manage.component.scss']
})
export class VacationManageComponent implements OnInit {

  icClose = icClose;
  configs = configs;
  users: { label: string; value: string }[] = [];
  form: FormGroup;
  isEditMode: boolean = false; // Nueva propiedad para identificar modo edición
  isApprovedOrRejected: boolean = false; // Nueva propiedad para el estado del botón

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _vacationService: VacationService,
    public _dialogRef: MatDialogRef<VacationManageComponent>
  ) {
    this.initForm();
  }

  initForm(): void {
    this.form = this._fb.group({
      vacationId: [0],  
      userId: [0, [Validators.required]],
      startDate: ["", [Validators.required]],
      endDate: ['', Validators.required],
      status: ['Pendiente'],
      daysEnjoyed: [0, Validators.required], 
      pendingDays: [0, Validators.required], 
      state: [1],
    });

  }

  ngOnInit(): void {
    if (this.data != null) {
      const vacationId = this.data.data.vacationId;
      this.VacationById(vacationId);
      this.isEditMode = vacationId > 0; // Se establece en true si hay un ID
    }
    this.loadUsers();
  }

  loadUsers(): void {
    this._vacationService.UserSelect().subscribe((users: any[]) => {
      this.users = users.map((user) => ({
        label: user.description,
        value: user.id,
      }));
    });
  }

  VacationById(vacationId: number): void {
    this._vacationService.VacationById(vacationId).subscribe((resp) => {
        const startDate = new Date(resp.startDate);
        const endDate = new Date(resp.endDate);
        this.form.reset({
            vacationId: resp.vacationId,
            userId: resp.userId,
            startDate: this.formatDate(startDate),
            endDate: this.formatDate(endDate),
            status: resp.status,
            state: resp.state,
            daysEnjoyed: resp.daysEnjoned, // Asegúrate de que esto se rellene desde la respuesta
            pendingDays: resp.pendingDays, // Asegúrate de que esto se rellene desde la respuesta
        });
        // Actualiza el estado del botón
        this.isApprovedOrRejected = resp.status === 'Aprobado' || resp.status === 'Rechazado';
    });
  }

  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  VacationSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAsTouched();
      });
    }

    const vacationId = this.form.get("vacationId")?.value;

    if (vacationId > 0) {
      this.VacationEdit(vacationId);
    } else {
      this.VacationRegister();
    }
  }

  VacationRegister(): void {
    this._vacationService
      .VacationRegister(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          console.log(resp);
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }

  VacationEdit(vacationId: number): void {
    this._vacationService
      .VacationEdit(vacationId, this.form.value)
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

