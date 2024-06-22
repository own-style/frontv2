import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../services/carrito.service';
import { CarritoIndexComponent } from '../carrito-index/carrito-index.component';
import { MatDialog } from '@angular/material/dialog';
import { CuentasService } from '../../../services/cuentas.service';
import { DashboardComponent } from '../../admin/dashboard/dashboard.component';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule,
            RouterLink,
            CommonModule,
            
          ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  cartCount = 0;

  constructor(private cartService: CartService,    
    private dialog: MatDialog,
    private router: Router,   
     private cuentasService: CuentasService,

  ) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.cartCount = cart.length;
    });
  }
  openCartSummary() {
    this.dialog.open(CarritoIndexComponent, {
      width: '500px'
    });
  }

  redirectToProfile() {
    console.log('isLoggedIn:', this.cuentasService.isLoggedIn());
    if (this.cuentasService.isLoggedIn()) {
      console.log('isAdmin:', this.cuentasService.isAdmin());
      if (this.cuentasService.isAdmin()) {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['']); // Cambia esto a la ruta de perfil de usuario normal
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
  logout() {
    this.cuentasService.cerrarSesion('/login');
  }
  


}
