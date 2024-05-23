import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';




export const routes: Routes = [
    
    {
        path: 'admin',
        loadChildren:() => import('./admin/admin.routes').then(x=>x.ADMIN_ROUTES)
    },

{
        path: '',
        loadChildren:() => import('./index/index.routes').then(x=>x.INDEX_ROUTES)
},

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }

