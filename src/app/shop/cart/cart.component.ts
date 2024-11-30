import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.Service'; // Adjust the import path as necessary
import { AuthService } from '../../services/auth.service'; // Import AuthService
import { CommandeProduitService, CommandeProduit } from '../../services/commandeproduit.service'; // Import CommandeProduitService
import { Product } from 'src/app/services/product.service';
import * as $ from 'jquery'; // Import jQuery

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Product[] = [];
  totalPrice: number = 0;

  constructor(
    private cartService: CartService,
    private authService: AuthService, // Inject AuthService
    private commandeProduitService: CommandeProduitService, // Inject CommandeProduitService
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.cart.forEach(product => {
      if (product.quantity === undefined) {
        product.quantity = 1; // Initialize quantity if undefined
      }
    });
    this.calculateTotalPrice();
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cart.reduce((sum, product) => sum + (product.prix * (product.quantity || 1)), 0);
  }

  updateCart(): void {
    this.cart.forEach(product => {
      if (product.quantity! < 1) {
        product.quantity = 1; // Ensure quantity is at least 1
      }
    });
    this.cartService.updateCart(this.cart);
    this.calculateTotalPrice();
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.cart = this.cartService.getCart();
    this.calculateTotalPrice();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.cart = [];
    this.totalPrice = 0;
  }

  placeOrder(): void {
    // Implement order placement logic here
    console.log('Order placed!');
  }

  continueShopping(): void {
    this.router.navigate(['/product-list']); // Navigate to the product list page
  }

  confirmOrder(): void {
    if (this.authService.isLoggedIn()) {
      // User is logged in, save the order to the database
      const order: CommandeProduit[] = this.cart.map(product => ({
        id: 0, // Assuming the backend will generate the ID
        productId: product.id,
        quantity: product.quantity || 1,
        price: product.prix
      }));

      // Send each CommandeProduit object individually
      order.forEach(commandeProduit => {
        this.commandeProduitService.createCommandeProduit(commandeProduit).subscribe({
          next: () => {
            console.log('Order item confirmed!');
          },
          error: (error) => {
            console.error('Error saving order item:', error);
          }
        });
      });

      this.clearCart();
      ($('#checkoutModal') as any).modal('hide'); // Close the modal
    } else {
      // User is not logged in, navigate to the login page
      this.authService.login();
    }
  }
}