import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.Service'; // Adjust the import path as necessary
import { AuthService } from '../../services/auth.service'; // Import AuthService
import { CommandeProduitService } from '../../services/commandeproduit.service'; // Import CommandeProduitService
import { CommandeProduits, Commandes, Produits, Utilisateurs } from 'src/app/interfaces/interfaces';
import { CommandeService } from 'src/app/services/commande.service';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Produits[] = [];
  totalPrice: number = 0;
  user: Utilisateurs = JSON.parse(localStorage.getItem('user') || '{}');

  constructor(
    private cartService: CartService,
    private authService: AuthService, // Inject AuthService
    private commandeProduitService: CommandeProduitService, // Inject CommandeProduitService
    private router: Router,
    private commandeService: CommandeService,
    private toastr: ToastrService
  ) { }

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
    const currentUrl = this.router.url;
    const activeRoute = currentUrl.split('/').includes('proprietaire') ? 'proprietaire' : 'client';

    if (activeRoute === 'proprietaire') {
      this.router.navigate(['/proprietaire/shop']); // Navigate to the shop page
    } else {
      this.router.navigate(['/shop']); // Navigate to the product list page
    }
  }

  async confirmOrder(): Promise<void> {
    if (this.authService.isLoggedIn()) {

      //cretae commande
      const commande: Commandes =
      {
        id: 0, // Assuming the backend will generate the ID
        proprietaireId: this.user.id,
        dateCommande: new Date(),
        statut: 'en_attente'
      };
      var createdCommande: Commandes = await firstValueFrom(this.commandeService.createCommande(commande));
      // User is logged in, save the order to the database
      const order: CommandeProduits[] = this.cart.map(product => ({
        id: 0, // Assuming the backend will generate the ID
        produitId: product.id,
        quantite: product.quantity!,
        commandeId: createdCommande.id

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
      $('#checkoutModal').modal('hide'); // Close the modal

      // Show a success message
      this.toastr.success('Commande passée avec succès!', 'Succès');
    } else {
      // User is not logged in, navigate to the login page
      this.authService.login();
    }
  }
}