import { Component, OnInit } from '@angular/core';
import { CommandeService } from 'src/app/services/commande.service';
import { CommandeProduits, Commandes, Produits } from 'src/app/interfaces/interfaces';
import { CommandeProduitService } from 'src/app/services/commandeproduit.service';
import { ProduitService } from 'src/app/services/produit.service';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit {
  commandes: Commandes[] = [];
  selectedCommande: Commandes | null = null;
  commandeProduits: CommandeProduits[] = [];
  produits: Map<number, Produits> = new Map();
  page: number = 1;

  constructor(
    private commandeService: CommandeService,
    private commandeProduitService: CommandeProduitService,
    private produitService: ProduitService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.fetchCommandes();
  }

  fetchCommandes(): void {
    this.commandeService.getAllCommandes().subscribe({
      next: (response: Commandes[]) => {
        this.commandes = response.sort((a, b) => new Date(b.dateCommande!).getTime() - new Date(a.dateCommande!).getTime());
      },
      error: (error: any) => {
        console.error('Erreur lors de la récupération des commandes', error);
        this.toastr.error('Erreur lors de la récupération des commandes', 'Erreur');
      }
    });
  }

  openCommandeModal(commande: Commandes): void {
    this.selectedCommande = commande;
    this.commandeProduitService.getCommandeProduitsByCommandeId(commande.id).subscribe({
      next: (response: CommandeProduits[]) => {
        this.commandeProduits = response;
        this.commandeProduits.forEach(cp => {
          this.produitService.getProduitById(cp.produitId).subscribe({
            next: (produit: Produits) => {
              this.produits.set(cp.produitId, produit);
            },
            error: (error: any) => {
              console.error('Erreur lors de la récupération du produit', error);
              this.toastr.error('Erreur lors de la récupération du produit', 'Erreur');
            }
          });
        });
        $('#commandeModal').modal('show');
      },
      error: (error: any) => {
        console.error('Erreur lors de la récupération des produits de la commande', error);
        this.toastr.error('Erreur lors de la récupération des produits de la commande', 'Erreur');
      }
    });
  }

  updateCommandeStatus(): void {
    if (this.selectedCommande) {
      this.commandeService.updateCommande(this.selectedCommande.id, this.selectedCommande).subscribe({
        next: () => {
          this.toastr.success('Statut de la commande mis à jour avec succès', 'Succès');
          this.fetchCommandes();
          $('#commandeModal').modal('hide');
        },
        error: (error: any) => {
          console.error('Erreur lors de la mise à jour du statut de la commande', error);
          this.toastr.error('Erreur lors de la mise à jour du statut de la commande', 'Erreur');
        }
      });
    }
  }
}