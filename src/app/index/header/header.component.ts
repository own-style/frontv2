import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../services/carrito.service';
import { CarritoIndexComponent } from '../carrito-index/carrito-index.component';
import { MatDialog } from '@angular/material/dialog';


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


}
