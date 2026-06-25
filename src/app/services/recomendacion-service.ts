import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecomendacionService {
  private http = inject(HttpClient);

  constructor() {}

  listarFiscales(): Observable<any> {
    return this.http.get(`${environment.apiURL}/recomendaciones/fiscales`);
  }

  listarInversion(): Observable<any> {
    return this.http.get(`${environment.apiURL}/recomendaciones/inversion`);
  }
}
