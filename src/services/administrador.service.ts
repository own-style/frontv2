import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Administrador } from '../interfaces/administrador';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {


  baseUrl : string = environment.apiUrl + '/Administradores'
  constructor(
    private http: HttpClient
  ) { }


  getAdministradores():Observable<Administrador[]>{
    return this.http.get<Administrador[]>(this.baseUrl)
  }
  getAdministradorById(id:number):Observable<any>{
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  crear(administrador: Administrador): Observable<void> {
    return this.http.post<void>(this.baseUrl, administrador);
  }
  
  editar(idAdministrador:number, administradorModificado:Administrador):Observable<Administrador>{
    return this.http.put<Administrador>(`${this.baseUrl}/${idAdministrador}`, administradorModificado)
  }
  
  eliminar(id:number):Observable<any>{
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}
