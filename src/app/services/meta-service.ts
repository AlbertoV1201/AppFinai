import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Meta } from '../model/meta';

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  private http = inject(HttpClient);

  constructor() {}

  private getId(): string {
    return localStorage.getItem('idUsuario') || '0';
  }

  list(): Observable<any> {
    return this.http.get(`${environment.apiURL}/usuarios/${this.getId()}/metas`);
  }

  insert(meta: Meta): Observable<any> {
    return this.http.post(`${environment.apiURL}/usuarios/${this.getId()}/metas`, meta);
  }
}
