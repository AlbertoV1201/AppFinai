import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movimiento } from '../model/movimiento';

@Injectable({
  providedIn: 'root',
})
export class MovimientoService {
  private http = inject(HttpClient);

  constructor() {}

  private getId(): string {
    return localStorage.getItem('idUsuario') || '0';
  }

  resumen(): Observable<any> {
    return this.http.get(`${environment.apiURL}/usuarios/${this.getId()}/resumen`);
  }

  insert(movimiento: Movimiento): Observable<any> {
    return this.http.post(`${environment.apiURL}/usuarios/${this.getId()}/movimientos`, movimiento);
  }
}
