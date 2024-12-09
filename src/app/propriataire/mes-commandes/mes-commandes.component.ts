import { Component, OnInit } from '@angular/core';
import { CommandeService } from 'src/app/services/commande.service';
import { CommandeProduits, Commandes, Produits, Utilisateurs } from 'src/app/interfaces/interfaces';
import { CommandeProduitService } from 'src/app/services/commandeproduit.service';
import { ProduitService } from 'src/app/services/produit.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-mes-commandes',
  templateUrl: './mes-commandes.component.html',
  styleUrls: ['./mes-commandes.component.css']
})
export class MesCommandesComponent implements OnInit {
  commandes: Commandes[] = [];
  selectedCommande: Commandes | null = null;
  commandeProduits: CommandeProduits[] = [];
  produits: Map<number, Produits> = new Map();
  page: number = 1;
  user: Utilisateurs = JSON.parse(localStorage.getItem('user') || '{}');
  totalPrice: number = 0;

  constructor(
    private commandeService: CommandeService,
    private commandeProduitService: CommandeProduitService,
    private produitsService: ProduitService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.fetchCommandes();
  }

  fetchCommandes(): void {
    this.commandeService.getCommandesByProprietaireId(this.user.id).subscribe({
      next: (response: Commandes[]) => {
        this.commandes = response.sort((a, b) => new Date(b.dateCommande!).getTime() - new Date(a.dateCommande!).getTime());
      },
      error: (error: any) => {
        console.error('Erreur lors de la récupération des commandes', error);
        this.toastr.error('Erreur lors de la récupération des commandes', 'Erreur');
      }
    });
  }

  calculateTotalPrice(): void {
    this.totalPrice = 0;
    this.commandeProduits.forEach(cp => {
      const produit = this.produits.get(cp.produitId);
      if (produit) {
        this.totalPrice += produit.prix * cp.quantite;
      }
    });
  }

  openCommandeModal(commande: Commandes): void {
    this.selectedCommande = commande;
    this.commandeProduitService.getCommandeProduitsByCommandeId(commande.id).subscribe({
      next: (response: CommandeProduits[]) => {
        this.commandeProduits = response;
        const productRequests = this.commandeProduits.map(cp =>
          this.produitsService.getProduitById(cp.produitId)
        );

        forkJoin(productRequests).subscribe({
          next: (produits: Produits[]) => {
            produits.forEach((produit, index) => {
              const cp = this.commandeProduits[index];
              this.produits.set(cp.produitId, produit);
            });
            this.calculateTotalPrice();
            $('#commandeModal').modal('show');
          },
          error: (error: any) => {
            console.error('Erreur lors de la récupération des produits', error);
            this.toastr.error('Erreur lors de la récupération des produits', 'Erreur');
          }
        });
      },
      error: (error: any) => {
        console.error('Erreur lors de la récupération des produits de la commande', error);
        this.toastr.error('Erreur lors de la récupération des produits de la commande', 'Erreur');
      }
    });
  }
}