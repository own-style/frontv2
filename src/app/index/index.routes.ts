import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import IndexComponent from './index/index.component';


export const INDEX_ROUTES: Routes = [

    {path: 'index', component: IndexComponent},
    {path: 'login', component: LoginComponent,},
    {path: 'registro', component: RegistroComponent,},

    
];
