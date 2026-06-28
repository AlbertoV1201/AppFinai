import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private http = inject(HttpClient);

  constructor() {}

  obtenerPanel(): Observable<any> {
    return this.http.get(`${environment.apiURL}/administrador/panel`);
  }

  listarTickets(): Observable<any> {
    return this.http.get(`${environment.apiURL}/administrador/tickets`);
  }

  obtenerTicket(idTicket: number): Observable<any> {
    return this.http.get(`${environment.apiURL}/administrador/tickets/${idTicket}`);
  }

  responderTicket(idTicket: number, respuesta: any): Observable<any> {
    return this.http.put(
      `${environment.apiURL}/administrador/tickets/${idTicket}/respuesta`,
      respuesta,
    );
  }
}
