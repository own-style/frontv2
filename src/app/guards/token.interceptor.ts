import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; 
import { CuentasService } from '../../services/cuentas.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: CuentasService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const myToken = this.auth.getToken();

    if (myToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${myToken}`
        }
      });
    }
    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {            
            Swal.fire({
              icon: 'warning',
              title: 'El token ha expirado',
              text: 'Por favor, vuelva a iniciar sesión.',
              confirmButtonText: 'OK'
            }).then(() => {
              this.router.navigate(['login']);
            });
          }
        }
        return throwError(err);
      })
    );
  }
}
