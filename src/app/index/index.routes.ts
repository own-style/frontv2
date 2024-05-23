import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { NgModule } from '@angular/core';
import { routes } from '../app.routes';



export const INDEX_ROUTES: Routes = [

    
    {path: '', component: IndexComponent},
    {path: 'login', component: LoginComponent,},
    {path: 'registro', component: RegistroComponent,},
    
];



@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class IndexRoutingModule { }

