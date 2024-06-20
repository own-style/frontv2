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
  deleteProducto(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  getProductoById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  updateProducto(id: number, producto: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, producto);
  }
  
}
