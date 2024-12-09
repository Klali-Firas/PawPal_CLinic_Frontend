import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.Service';
import { AuthService } from '../../services/auth.service';
import { CommandeProduitService } from '../../services/commandeproduit.service';
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
    private authService: AuthService,
    private commandeProduitService: CommandeProduitService,
    private router: Router,
    private commandeService: CommandeService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.cart.forEach(product => {
      if (product.quantity === undefined) {
        product.quantity = 1;
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
        product.quantity = 1;
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

  async confirmOrder(): Promise<void> {
    if (this.authService.isLoggedIn()) {
      const commande: Commandes = {
        id: 0,
        proprietaireId: this.user.id,
        dateCommande: new Date(),
        statut: 'en_attente'
      };
      var createdCommande: Commandes = await firstValueFrom(this.commandeService.createCommande(commande));
      const order: CommandeProduits[] = this.cart.map(product => ({
        id: 0,
        produitId: product.id,
        quantite: product.quantity!,
        commandeId: createdCommande.id
      }));

      order.forEach(commandeProduit => {
        this.commandeProduitService.createCommandeProduit(commandeProduit).subscribe({
          next: () => {
            console.log('Article de commande confirmé!');
          },
          error: (error) => {
            console.error('Erreur lors de l\'enregistrement de l\'article de commande:', error);
          }
        });
      });

      this.clearCart();
      $('#checkoutModal').modal('hide');
      this.toastr.success('Commande passée avec succès!', 'Succès');
    } else {
      this.authService.login();
    }
  }

  continueShopping(): void {
    const currentUrl = this.router.url;
    const activeRoute = currentUrl.split('/').includes('proprietaire') ? 'proprietaire' : 'client';

    if (activeRoute === 'proprietaire') {
      this.router.navigate(['/proprietaire/shop']);
    } else {
      this.router.navigate(['/shop']);
    }
  }
}