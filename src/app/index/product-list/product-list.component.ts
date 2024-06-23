import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../interfaces/producto';
import { ProductosService } from '../../../services/productos.service';
import { CartService } from '../../../services/carrito.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit{
  
  productos: Producto[] = [];

  constructor(private productosService: ProductosService,
              private cartService: CartService,
              private router:Router,

  ) {}

  ngOnInit(): void {
    this.productosService.getProductos().subscribe({
      next: (res) => {
        this.productos = res;
      },
      error: (err) => {
        console.error('Error al obtener los productos', err);
      }
    });
  }
  addToCart(producto: Producto) {
    this.cartService.addToCart(producto);
  }
  verDetalles(productId: number): void {
    this.router.navigate(['/product', productId]);
  }

}
