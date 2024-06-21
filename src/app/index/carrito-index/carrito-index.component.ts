import { Component } from '@angular/core';
import { Producto } from '../../../interfaces/producto';
import { CartService } from '../../../services/carrito.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-carrito-index',
  standalone: true,
  imports: [CommonModule,
            HeaderComponent,
            FooterComponent
  ],
  templateUrl: './carrito-index.component.html',
  styleUrl: './carrito-index.component.scss'
})
export class CarritoIndexComponent {
  
  cartItems: Producto[] = [];
  total = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.total = this.cartService.getCartTotal();
    });
  }

  removeFromCart(product: Producto) {
    this.cartService.removeFromCart(product);
  }

}
