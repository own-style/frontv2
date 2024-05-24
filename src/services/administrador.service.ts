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

  crear(administrador:Administrador):Observable<Administrador>{
    return this.http.post<Administrador>(environment.apiUrl+"/administradores", administrador);
  }
  
  editar(idAdministrador:number, administradorModificado:Administrador):Observable<Administrador>{
    return this.http.put<Administrador>(`${this.baseUrl}/${idAdministrador}`, administradorModificado)
  }

  eliminar(id:number):Observable<void>{
    return this.http.delete<void>(this.baseUrl+"/"+id)
  }

}
