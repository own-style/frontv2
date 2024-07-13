import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MercadoPagoService {
  

  private baseUrl: string = 'https://localhost:7282/api/Venta';

  constructor(private http: HttpClient) { }

  crearPago(pago: any): Observable<any> {
    return this.http.post(this.baseUrl, pago);
  }
}
