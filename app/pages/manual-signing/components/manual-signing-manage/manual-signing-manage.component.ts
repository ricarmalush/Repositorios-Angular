import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import icClose from "@iconify/icons-ic/twotone-close";
import * as configs from "../../../../../static-data/configs";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '@shared/services/alert.service';
import { ManualSigningService } from '../../services/manual-signing.service';
import { TypeSelect } from '../../../../../static-data/configs';
import { ComboSelectService } from '@shared/services/combos.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'vex-manual-signing-manage',
  templateUrl: './manual-signing-manage.component.html',
  styleUrls: ['./manual-signing-manage.component.scss'],
})
export class ManualSigningManageComponent implements OnInit {

  icClose = icClose;
  configs = configs;
  users: { label: string; value: string }[] = [];
  provinces: { value: string, label: string }[] = [];
  communities: { value: string, label: string }[] = [];
  isEditMode: boolean = false;

  form: FormGroup;

  TypeSelect = TypeSelect;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _signingService: ManualSigningService,
    private _comboSelectService: ComboSelectService,
    public _dialogRef: MatDialogRef<ManualSigningManageComponent>
  ) {
    this.initForm();
  }

  initForm(): void {
    this.form = this._fb.group({
      signingUpId: [0],  
      signingDateTime: ["", [Validators.required]],
      userId: [0, [Validators.required]],
      provinceId: [0, [Validators.required]],
      province: "",
      communityId: [null, [Validators.required]], 
      community: "", 
      street: ["", [Validators.required]],
      cause: ["", [Validators.required]],
      type: ["", [Validators.required]],
      state: [1],      
      clockCreateBy: "Oficina" //Cuando se ficha manualmente es siempre de oficina
    });
  }
  

  ngOnInit(): void {
    this.loadUsers();
    this.loadProvinces();

    if (this.data) {
      const signingUpId = this.data.data.signingUpId;
      this.SigningById(signingUpId);
      this.isEditMode = signingUpId > 0;
    }
  }

  loadProvinces(): void {
    this._comboSelectService.ProvinceSelect().subscribe((provinces: any[]) => {
      this.provinces = provinces.map((province) => ({
        label: province.description,
        value: province.id
      }));
    });
  }

  onSelectProvince(provinceId: number): void {
    this.loadCommunities(provinceId).subscribe(() => {
      console.log("Communities reloaded on province change: ", this.communities);
    });
  }

  loadCommunities(provinceId: number): Observable<any> {
    return this._signingService.ProvincesByCommunitySelect(provinceId).pipe(
      tap((response: any) => {
        this.communities = response.data.map((community) => ({
          label: community.communityName,
          value: Number(community.comunityId), 
        }));
      })
    );
  }

  onSelectCommunity(event: any): void {
    const selectedCommunityId = event.value;
    this.form.patchValue({
      communityId: selectedCommunityId
    });
  }

  loadUsers(): void {
    this._comboSelectService.UserSelect().subscribe((users: any[]) => {
      this.users = users.map((user) => ({
        label: user.description,
        value: user.id,
      }));
    });
  }

  SigningById(signingUpId: number): void {
    this._signingService.SigningById(signingUpId).subscribe((resp) => {
      console.log("Response from API: ", resp);
      const typeValue = this.TypeSelect.find(option => option.label === resp.type)?.value;
    
      this.loadProvinces();
  
      this.loadCommunities(resp.provinceId).subscribe(() => {
        console.log("Communities loaded: ", this.communities);
  
        this.form.patchValue({
          signingUpId: resp.signingUpId,
          userId: resp.userId,
          provinceId: resp.provinceId,
          communityId: resp.communityId, 
          signingDateTime: resp.signingDateTime,
          street: resp.street,
          cause: resp.cause,
          type: typeValue || '',
          state: resp.state || 1
        });
  
        console.log("Form after patchValue: ", this.form.value);
      });
    });
  }
  
  
  
  SigningSave(): void {
    if (this.form.invalid) {
      console.log('Form Errors:', this.form.errors);
      return Object.values(this.form.controls).forEach(controls => {
        controls.markAsTouched();
      });
    }
  
    const signingUpId = this.form.get("signingUpId")?.value;
  
    if (signingUpId > 0) {
      this.SigningEdit(signingUpId);
    } else {
      this.SigningRegister();
    }
  }
  
  SigningRegister(): void {
    const formValue = this.form.value;
    const selectedCommunity = this.communities.find(community => community.value === formValue.communityId);
  
    const requestPayload = {
      ...formValue,
      community: selectedCommunity ? selectedCommunity.label : ''
    };
  
    this._signingService
      .SigningRegister(requestPayload)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }

  SigningEdit(signingUpId: number): void {
    const formValue = this.form.value;
    const selectedCommunity = this.communities.find(community => community.value === formValue.communityId);
  
    const requestPayload = {
      ...formValue,
      community: selectedCommunity ? selectedCommunity.label : ''
    };
  
    this._signingService
      .SigningEdit(signingUpId, requestPayload)
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