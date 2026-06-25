import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Presupuesto } from '../model/presupuesto';

@Injectable({
  providedIn: 'root',
})
export class PresupuestoService {
  private http = inject(HttpClient);

  constructor() {}

  private getId(): string {
    return localStorage.getItem('idUsuario') || '0';
  }

  list(): Observable<any> {
    return this.http.get(`${environment.apiURL}/usuarios/${this.getId()}/presupuestos`);
  }

  insert(presupuesto: Presupuesto): Observable<any> {
    console.log(presupuesto);

    return this.http.post(
      `${environment.apiURL}/usuarios/${this.getId()}/presupuestos`,
      presupuesto,
    );
  }
}
