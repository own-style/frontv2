import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { CarritoIndexComponent } from './carrito-index/carrito-index.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CheckoutComponent } from './checkout/checkout.component';




export const INDEX_ROUTES: Routes = [
    
    {path: '', component: IndexComponent},
    { path: 'product/:id', component: ProductDetailsComponent,},
    {path: 'carrito', component: CarritoIndexComponent,},
    {path: 'login', component: LoginComponent,},
    {path: 'registro', component: RegistroComponent,},
    { path: 'checkout', component: CheckoutComponent }, 
    
];



