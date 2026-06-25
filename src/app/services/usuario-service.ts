import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Usuario } from '../model/usuario';
import { ResponseDto } from '../model/response-dto';
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private http = inject(HttpClient);
  private url = environment.apiURL;

  private listaCambio = new Subject<Usuario[]>();

  constructor() {}

  registrar(usuario: Usuario): Observable<string> {
    return this.http.post(`${this.url}/autenticacion/registrar`, usuario, {
      responseType: 'text',
    });
  }

  login(usuario: Usuario): Observable<ResponseDto> {
    return this.http.post<ResponseDto>(`${this.url}/autenticacion/login`, usuario);
  }
}
