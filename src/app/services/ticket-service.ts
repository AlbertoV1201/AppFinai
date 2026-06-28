import { inject, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { Ticket } from '../model/ticket';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private http = inject(HttpClient);

  private getId(): string {
    return localStorage.getItem('idUsuario') || '0';
  }

  list(): Observable<any> {
    return this.http.get(`${environment.apiURL}/usuarios/${this.getId()}/tickets`);
  }

  insert(ticket: Ticket): Observable<any> {
    return this.http.post(
      `${environment.apiURL}/usuarios/${this.getId()}/tickets`,

      ticket,
    );
  }
}
