import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private url = environment.apiURL;
  private httpClient: HttpClient = inject(HttpClient);

  registrar(usuario: Usuario): Observable<string> {
    return this.httpClient.post(this.url + '/autenticacion/registrar', usuario, {
      responseType: 'text',
    });
  }

  login(correo: string, contrasena: string): Observable<string> {
    return this.httpClient.post(
      this.url + '/autenticacion/login',
      { correo, contrasena },
      { responseType: 'text' }
    );
  }
}
