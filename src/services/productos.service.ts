import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { ProductoDTO } from '../interfaces/producto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {


  baseUrl : string = environment.apiUrl + '/Productos'

  constructor(
    private http:HttpClient
  ) { }


  getProductos():Observable<ProductoDTO[]>{
    return this.http.get<ProductoDTO[]>(this.baseUrl)
  }
}
