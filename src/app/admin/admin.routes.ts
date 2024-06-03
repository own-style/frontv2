import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ProductosComponent } from './productos/productos.component';
import { AdministradoresComponent } from './administradores/administradores.component';
import { NgModule } from '@angular/core';
import { routes } from '../app.routes';
import { authGuard } from '../guards/auth.guard';


export const ADMIN_ROUTES: Routes = [
    
    {path:'', component:DashboardComponent, pathMatch:'full'},
    {path:'dashboard', component:DashboardComponent},    
    {path:'administradores', component:AdministradoresComponent},
    {path:'clientes', component:ClientesComponent},
    {path:'productos', component:ProductosComponent},

    
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AdminRoutingModule { }