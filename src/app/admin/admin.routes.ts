import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ProductosComponent } from './productos/productos.component';
import { AdministradoresComponent } from './administradores/administradores.component';


export const ADMIN_ROUTES: Routes = [
    {path:'', component:DashboardComponent, pathMatch:'full'},
    {path:'dashboard', component:DashboardComponent},
    {path:'administradores', component:AdministradoresComponent},
    {path:'clientes', component:ClientesComponent},
    {path:'productos', component:ProductosComponent},
    
];
