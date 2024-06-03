import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { cliente } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  baseUrl : string = environment.apiUrl + '/Clientes'

  constructor(
    private http:HttpClient
  ) { }



  getClientes():Observable<cliente[]>{
    return this.http.get<cliente[]>(this.baseUrl)
  }









}
