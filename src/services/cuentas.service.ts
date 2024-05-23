import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable ({
    providedIn: 'root'
  })


  export class CuentasService {
      
      
    private baseUrl : string = "https://localhost:7282/api/Cuentas/"


    constructor( 
        private http:HttpClient){

    }


    signUp(userObj:any){
        return this.http.post<any>(`${this.baseUrl}registro`,userObj)
      }
    
    
    signIn(loginObj: any){
        return this.http.post<any>(`${this.baseUrl}login`, loginObj);        
    }
    
    storeToken(tokenValue: string){
        localStorage.setItem('token', tokenValue)
      }


}