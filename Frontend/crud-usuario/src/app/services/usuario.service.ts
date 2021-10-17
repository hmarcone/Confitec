import { Usuario } from './../models/Usuario';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseURL = 'https://localhost:5001/api/v1/usuarios';

  constructor(private http: HttpClient) { }

  public getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseURL).pipe(take(1));
  }

  public getUsuarioById(id: number): Observable<Usuario> {
    return this.http
      .get<Usuario>(`${this.baseURL}/${id}`)
      .pipe(take(1));
  }

  public post(usuario: Usuario): Observable<Usuario> {
    return this.http
      .post<Usuario>(this.baseURL, usuario)
      .pipe(take(1));
  }

  public put(usuario: Usuario): Observable<Usuario> {
    return this.http
      .put<Usuario>(`${this.baseURL}/${usuario.id}`, usuario)
      .pipe(take(1));
  }

  public deleteUsuario(id: number): Observable<any> {
    return this.http
      .delete(`${this.baseURL}/${id}`)
      .pipe(take(1));
  }
}
