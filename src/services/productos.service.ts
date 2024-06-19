import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Producto } from '../interfaces/producto';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {


  baseUrl : string = environment.apiUrl + '/Productos'

  constructor(
    private http:HttpClient
  ) { }


  getProductos():Observable<Producto[]>{
    return this.http.get<Producto[]>(this.baseUrl)
  }
  createProductos(producto:FormData):Observable<any>{
    return this.http.post<Producto>(this.baseUrl, producto)
  }
}
