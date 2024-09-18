// import { Routes } from '@angular/router';
// import { adminGuard } from './guards/auth.guard';


// export const routes: Routes = [
//   {
//     path: '',
//     loadChildren: () =>
//       import('./index/index.routes').then((x) => x.INDEX_ROUTES),
//   },

//   {
//     path: 'admin',
//     loadChildren: () =>
//       import('./admin/admin.routes').then((x) => x.ADMIN_ROUTES),
//     canActivate: [adminGuard],
//   },
  
// ];

import { Routes } from '@angular/router';
import { adminGuard } from './guards/auth.guard';
import { AdminLayoutComponent } from './admin/AdminLayoutComponent';
import { AppLayoutComponent } from './index/AppLayoutComponent ';


export const routes: Routes = [

  {
      path: '',        
      component: AppLayoutComponent,
      loadChildren: () =>
        import('./index/index.routes').then((x) => x.INDEX_ROUTES),
  },

  {
    path: 'admin',    
    component: AdminLayoutComponent,
    loadChildren: () =>
      import('./admin/admin.routes').then(x => x.ADMIN_ROUTES), 
    canActivate: [adminGuard],
  },
];

