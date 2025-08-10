import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ComboSelectService } from '@shared/services/combos.service';
import * as mapboxgl from 'mapbox-gl';
import { environment as env } from 'src/environments/environment';
import { componentSettings } from './map-layout-config';
import { DateRange, FiltersBox } from '@shared/models/search-options.interface';
import { MapService } from '../../services/map.service';
import { MapSelectResponse } from '../../models/map-response.interface';
import { MapSelectRequest } from '../../models/map-request.interface';
import { BaseResponse } from '@shared/models/base-api-response.interface';
import { MatSelectChange } from '@angular/material/select';
import { MapAccessPointRequest } from '../../models/map-request-access-point.interface';

@Component({
  selector: 'vex-map-layout',
  templateUrl: './map-layout.component.html',
  styleUrls: ['./map-layout.component.scss'],
})
export class MapLayoutComponent implements OnInit {
  @ViewChild('userLabel') userLabel: ElementRef | undefined;
  component: any;
  users: { label: string; value: string }[] = [];
  accessPoints: { label: string; value: string }[] = [];
  form: FormGroup;

  map: mapboxgl.Map | undefined;
  style = 'mapbox://styles/mapbox/satellite-streets-v12';
  lat: number = 41.65606;
  lng: number =  -0.87734;

  constructor(
    private _comboSelectService: ComboSelectService,
    private _accesService: MapService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // Inicializar el FormGroup
    this.form = this.fb.group({
      userId: [''],
      startDate: [''], 
      endDate: [''],
      signingUpId: ['']
    });

    // Inicializar el mapa
    this.map = new mapboxgl.Map({
      accessToken: env.mapToken,
      container: 'map',
      style: this.style,
      center: [this.lng, this.lat],
      zoom: 16.6
    });

    this.component = componentSettings;
    this.loadUsers();
  }

  searchSelect(): void {
    const userId = this.form.get('userId')?.value;
    const startDateStr = this.form.get('startDate')?.value;
    const endDateStr = this.form.get('endDate')?.value;

    const startDate = startDateStr ? new Date(startDateStr) : null;
    const endDate = endDateStr ? new Date(endDateStr) : null;

    this.component.filters.numFilter = userId;
    this.component.filters.startDate = startDate;
    this.component.filters.endDate = endDate;
  
    this.formatGetInputs();
    this.loadAccessPoints();
  }
  
  loadAccessPoints(): void {
    const userId = this.component.filters.numFilter;
    const startDate = this.component.filters.startDate;
    const endDate = this.component.filters.endDate;
  
    const request: MapSelectRequest = {
      userId: userId,
      startDate: startDate,
      endDate: endDate
    };
  
    this._accesService.AccessPointSelect(request).subscribe((response: BaseResponse) => {
      console.log('Datos de puntos de fichaje:', response.data), // Verifica los datos
      this.accessPoints = response.data.map((accessPoint: MapSelectResponse) => ({
        label: accessPoint.streetAccessPoint,
        value: accessPoint.signingUpId
      }));
    });
  }
  
  clearLabelAndResetSelect() {
    if (this.userLabel) {
      this.userLabel.nativeElement.textContent = '';
    }
    
    this.form.get('userId')?.setValue('');
    this.form.get('signingUpId')?.setValue('');
    this.form.get('startDate')?.setValue('');
    this.form.get('endDate')?.setValue('');
  }

  addMarkerWithPlaceholder(lnglat: mapboxgl.LngLat, data: { name: string; time: string; place: string; type: string; imageUrl: string }) {
    if (!this.map) return;
  
    // Crear el HTML del popup con la información del punto de fichaje
    const popupHtml = `
      <div style="text-align: left; font-family: Arial, sans-serif; line-height: 1.5; padding: 10px; width: 200px;">
        <h3 style="margin: 0; font-size: 16px;">${data.name}</h3>
        <p style="margin: 5px 0; font-size: 14px;"><strong>Tipo:</strong> ${data.type}</p>
        <p style="margin: 5px 0; font-size: 14px;"><strong>Hora:</strong> ${data.time}</p>
        <p style="margin: 5px 0; font-size: 14px;"><strong>Lugar:</strong> ${data.place}</p>
      </div>
    `;
  
    // Crear el popup
    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(popupHtml);
  
    // Crear un elemento para el marcador con una imagen personalizada
    const el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = `url(${data.imageUrl || 'assets/img/demo/foto.png'})`;
    el.style.width = '50px'; 
    el.style.height = '50px';
    el.style.backgroundSize = 'cover';
    el.style.borderRadius = '50%'; 
  
    // Crear y agregar el marcador con la imagen personalizada
    new mapboxgl.Marker(el)
      .setLngLat(lnglat)
      .setPopup(popup) // Agregar el popup al marcador
      .addTo(this.map);
  
    // Mover el mapa a la ubicación del marcador
    this.map.flyTo({
      center: lnglat,
      zoom: 16,
      essential: true 
    });
  }
  
  
  
  setData(value: number) {
    this.component.filters.stateFilter = value;
    this.formatGetInputs();
  }

  search(data: FiltersBox) {
    this.component.filters.numFilter = data.searchValue;
    this.component.filters.textFilter = data.searchData;
    this.formatGetInputs();
  }

  searchDateRange(date: DateRange) {
    this.form.get('startDate')?.setValue(date.startDate || '');
    this.form.get('endDate')?.setValue(date.endDate || '');
  }

  resetFilters() {
    this.component.filters = { ...this.component.resetFilters };
    this.formatGetInputs();
    this.clearLabelAndResetSelect();
  }

  formatGetInputs() {
    let str = "";
  
    if (this.component.filters.textFilter != null) {
      str += `&numFilter=${this.component.filters.numFilter}&textFilter=${this.component.filters.textFilter}`;
    }
  
    if (this.component.filters.stateFilter != null) {
      str += `&stateFilter=${this.component.filters.stateFilter}`;
    }

    if (this.component.filters.startDate && this.component.filters.endDate) {
      str += `&startDate=${this.component.filters.startDate.toISOString()}`;
      str += `&endDate=${this.component.filters.endDate.toISOString()}`;
    }
  
    if (this.component.filters.refresh) {
      let random = Math.random();
      str += `&refresh=${random}`;
      this.component.filters.refresh = false;
    }
  
    this.component.getInputs = str;
  }
  

  loadUsers(): void {
    this._comboSelectService.UserSelect().subscribe((users: any[]) => {
      this.users = users.map((user) => ({
        label: user.description,
        value: user.id,
      }));
    });
  }

  onSelectionChange(event: MatSelectChange) {
    const selectedSigningUpId = event.value;
  
    const request: MapAccessPointRequest = { signingUpId: selectedSigningUpId };
  
    // Se Llama al servicio para obtener los datos por SigningUpId
    this._accesService.AccessPoint(request).subscribe((response: BaseResponse) => {
      console.log("Data: ", response.data)
      const pointData = response.data;
      const user = pointData.users[0];
  
      if (pointData) {
        const lnglat = new mapboxgl.LngLat(pointData.longitude, pointData.latitude); 
        const markerData = {
          name: user.name + " " + user.lastName1,
          time: pointData.signingDateTime,
          place: pointData.place,
          type: pointData.type,
          imageUrl: pointData.imageUrl
        };
  
        this.addMarkerWithPlaceholder(lnglat, markerData);
      } 
    });
  }
  
  

}
