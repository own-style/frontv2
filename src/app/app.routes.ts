import { Routes } from '@angular/router';
import IndexComponent from './index/index/index.component';

export const routes: Routes = [
    
{
    path: '', 
    loadChildren:() => import('./index/index.routes').then(x=>x.INDEX_ROUTES)

},
{
    path: 'admin',
    loadChildren:() => import('./admin/admin.routes').then(x=>x.ADMIN_ROUTES)
}

];
