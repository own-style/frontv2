import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../interfaces/producto';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new BehaviorSubject<Producto[]>(this.getCartFromLocalStorage());
  cart$ = this.cart.asObservable();

  constructor() {}

  private getCartFromLocalStorage(): Producto[] {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }

  private updateLocalStorage(cart: Producto[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  addToCart(product: Producto) {
    const currentCart = this.cart.value;
    const updatedCart = [...currentCart, product];
    this.cart.next(updatedCart);
    this.updateLocalStorage(updatedCart);
    Swal.fire('Ok!', 'Producto agregado al carrito.', 'success');
  }

  removeFromCart(product: Producto) {
    const currentCart = this.cart.value;
    const updatedCart = currentCart.filter(item => item.id !== product.id);
    this.cart.next(updatedCart);
    this.updateLocalStorage(updatedCart);
  }

  clearCart() {
    this.cart.next([]);
    this.updateLocalStorage([]);
  }

  getCartTotal() {
    return this.cart.value.reduce((total, product) => total + product.precio, 0);
  }

  getCartCount() {
    return this.cart.value.length;
  }
  
}
