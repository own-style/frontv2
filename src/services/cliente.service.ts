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
    return this.http.get<cliente[]>(this.baseUrl);
  }
  getClienteById(id:number):Observable<any>{
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  deleteClients(id:number):Observable<any>{
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  updateCliente(id: number, cliente: cliente): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, cliente);
  }
  


}
