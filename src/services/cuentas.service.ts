import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import jwt_decode, { JwtPayload } from "jwt-decode"; // Importa jwt_decode y JwtPayload
import { BehaviorSubject, Observable, map } from "rxjs";
import { Credentials } from "../interfaces/credentials";






@Injectable ({
    providedIn: 'root'
  })


  export class CuentasService {
      
      
    private baseUrl : string = "https://localhost:7282/api/Cuentas/"


  constructor( 
               private http:HttpClient,
               private router:Router
      )
      {
        this.datosCredentials = new BehaviorSubject<Credentials | null>(JSON.parse(localStorage.getItem('credentials')!) || null);
      }

      private datosCredentials:BehaviorSubject<Credentials | null>;



      get getDatosCredentials(){
        return this.datosCredentials.asObservable();
      }

      set setDatosCredentails(value:Credentials | null){
         this.datosCredentials.next(value)
      }

      login(email:string, password: string):Observable<Credentials>{
        const Credentials ={
          email:email,
          password:password,
        }
        return this.http.post<Credentials>(this.baseUrl+'login', Credentials).pipe(
          map((res)=>{
            this.datosCredentials.next(res);
            localStorage.setItem('credenciales',JSON.stringify(res))

            return res;
          })
        )
          
        }





    registro(userObj:any){
        return this.http.post<any>(`${this.baseUrl}registro`,userObj)
      }
    
    

    storeToken(tokenValue: string){
        localStorage.setItem('token', tokenValue)
      }

    getToken(){
        return localStorage.getItem('token')
    }

    isLoggedIn(): boolean{
      return !!localStorage.getItem('token')
    }

    cerrarSesion(ruta:string = ''):void{
      this.setDatosCredentails = null;
      localStorage.removeItem('credenciales');
      this.router.navigate([ruta]);
    }

}