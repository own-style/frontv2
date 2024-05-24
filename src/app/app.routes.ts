import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';





export const routes: Routes = [
    {
        path: '',
        loadChildren:() => import('./index/index.routes').then(x=>x.INDEX_ROUTES),
            
    },
    
    {
        path: 'admin',
        loadChildren:() => import('./admin/admin.routes').then(x=>x.ADMIN_ROUTES),
        canActivate:[authGuard]
        
    },


];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }

