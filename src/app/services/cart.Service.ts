import { Injectable } from '@angular/core';
import { Product } from './product.service'; // Adjust the import path as necessary

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'cart';

  constructor() {}

  addToCart(product: Product): void {
    const cart = this.getCart();
    const existingProduct = cart.find(p => p.id === product.id);
    if (existingProduct) {
      existingProduct.quantity = (existingProduct.quantity || 1) + 1;
    } else {
      product.quantity = 1;
      cart.push(product);
    }
    this.saveCart(cart);
    console.log('Product added to cart:', product);
  }

  getCart(): Product[] {
    const cart = localStorage.getItem(this.cartKey);
    return cart ? JSON.parse(cart) : [];
  }

  removeFromCart(productId: number): void {
    let cart = this.getCart();
    cart = cart.filter(product => product.id !== productId);
    this.saveCart(cart);
  }

  clearCart(): void {
    localStorage.removeItem(this.cartKey);
  }

  public saveCart(cart: Product[]): void {
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  updateCart(cart: Product[]): void {
    this.saveCart(cart);
  }
}