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

  createAdministradores(administrador: Administrador) {
    return this.http.post<any>(this.baseUrl,administrador);
  }

}
