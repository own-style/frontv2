import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Credentials } from '../interfaces/credentials';

@Injectable({
  providedIn: 'root',
})
export class CuentasService {
  private baseUrl: string = 'https://localhost:7282/api/Cuentas/';
  private datosCredentials: BehaviorSubject<Credentials | null>;

  constructor(private http: HttpClient, private router: Router) {
    this.datosCredentials = new BehaviorSubject<Credentials | null>(JSON.parse(localStorage.getItem('credentials')!) || null);
  }

  get getDatosCredentials() {
    return this.datosCredentials.asObservable();
  }

  set setDatosCredentails(value: Credentials | null) {
    this.datosCredentials.next(value);
  }

  login(email: string, password: string): Observable<Credentials> {
    const Credentials = {
      email: email,
      password: password,
    };
    return this.http.post<Credentials>(this.baseUrl + 'login', Credentials).pipe(map((res) => 
        { 
          this.datosCredentials.next(res);
          localStorage.setItem('credenciales', JSON.stringify(res));
          localStorage.setItem('token', res.token); // Guarda el token aquí
          return res;
        })
      );
  }

  registro(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}registro`, userObj);
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  cerrarSesion(ruta: string = ''): void {
    this.setDatosCredentails = null;
    localStorage.removeItem('credenciales');
    localStorage.removeItem('token'); // Remueve el token aquí también
    this.router.navigate([ruta]);
  }

  isAdmin(): boolean {
    const token = this.getToken();
    if (!token) 
      return false;
    const decoded: any = jwtDecode(token);
    console.log('Decoded token:', decoded); // Log para ver el contenido del token
    return (
      decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'admin'
    );
  }
}
