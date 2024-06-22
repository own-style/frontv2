import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {  HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { TokenInterceptor } from './guards/token.interceptor';



export const appConfig: ApplicationConfig = {
  providers: [   
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }, 
    provideRouter(routes), 
    provideAnimationsAsync(),     
    provideHttpClient(),    
 ]
};
