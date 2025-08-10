import { Component, Inject, OnInit } from '@angular/core';
import icClose from "@iconify/icons-ic/twotone-close";
import * as configs from "../../../../../static-data/configs";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from '@shared/services/alert.service';
import { DocumentTypeService } from '../../services/document-type.service';

@Component({
  selector: 'vex-document-type-manage',
  templateUrl: './document-type-manage.component.html',
  styleUrls: ['./document-type-manage.component.scss']
})
export class DocumentTypeManageComponent implements OnInit {

  icClose = icClose;
  configs = configs;

  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _documentTypeService: DocumentTypeService,
    public _dialogRef: MatDialogRef<DocumentTypeManageComponent>
  ) {
    this.initForm();
  }

  initForm(): void {
    this.form = this._fb.group({
      documentTypeId: [0, [Validators.required]],
      name: ["", [Validators.required]],
      state: ["", [Validators.required]],
    });
  }


  ngOnInit(): void {
    if (this.data != null) {
      this.DocumentTypeById(this.data.data.documentTypeId);
    }
  }

  DocumentTypeById(documentTypeId: number): void {
    this._documentTypeService.DocumentTypeById(documentTypeId).subscribe((resp) => {
      this.form.reset({
        documentTypeId: resp.documentTypeId,
        name: resp.name,
        state: resp.state,
      });
    });
  }

  DocumentTypeSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const documentTypeId = this.form.get("documentTypeId").value;

    if (documentTypeId > 0) {
      this.DocumentTypeEdit(documentTypeId);
    } else {
      this.DocumentTypeRegister();
    }
  }

  DocumentTypeRegister(): void {
    this._documentTypeService
      .DocumentTypeRegister(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }

  DocumentTypeEdit(documentTypeId: number): void {
    this._documentTypeService
      .DocumentTypeEdit(documentTypeId, this.form.value)
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
