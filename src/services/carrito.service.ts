import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new BehaviorSubject<Producto[]>([]);
  cart$ = this.cart.asObservable();

  constructor() {}

  addToCart(product: Producto) {
    const currentCart = this.cart.value;
    const updatedCart = [...currentCart, product];
    this.cart.next(updatedCart);
  }

  removeFromCart(product: Producto) {
    const currentCart = this.cart.value;
    const updatedCart = currentCart.filter(item => item.id !== product.id);
    this.cart.next(updatedCart);
  }

  clearCart() {
    this.cart.next([]);
  }

  getCartTotal() {
    return this.cart.value.reduce((total, product) => total + product.precio, 0);
  }

  getCartCount() {
    return this.cart.value.length;
  }
}
