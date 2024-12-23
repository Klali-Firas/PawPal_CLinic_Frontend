import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProduitService } from 'src/app/services/produit.service';
import { Produits } from 'src/app/interfaces/interfaces';
import { ToastrService } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';

declare var $: any;

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  produits: Produits[] = [];
  selectedProduit: Produits | null = null;
  produitForm: FormGroup;
  isEditMode: boolean = false;
  page: number = 1;

  constructor(
    private produitService: ProduitService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.produitForm = this.fb.group({
      id: [0],
      nomProduit: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      prix: [0, [Validators.required, Validators.min(0.01)]],
      quantiteStock: [0, [Validators.required, Validators.min(0)]],
      image: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchProduits();
  }

  fetchProduits(): void {
    this.produitService.getAllProduits().subscribe({
      next: (response: Produits[]) => {
        this.produits = response;
      },
      error: (error: any) => {
        console.error('Erreur lors de la récupération des produits', error);
        this.toastr.error('Erreur lors de la récupération des produits', 'Erreur');
      }
    });
  }

  openProduitModal(produit?: Produits): void {
    if (produit) {
      this.isEditMode = true;
      this.selectedProduit = produit;
      this.produitForm.patchValue(produit);
    } else {
      this.isEditMode = false;
      this.selectedProduit = null;
      this.produitForm.reset();
    }
    $('#produitModal').modal('show');
  }

  saveProduit(): void {
    if (this.produitForm.valid) {
      const produit: Produits = this.produitForm.value;
      if (this.isEditMode) {
        this.produitService.updateProduit(produit.id, produit).subscribe({
          next: () => {
            this.toastr.success('Produit mis à jour avec succès', 'Succès');
            this.fetchProduits();
            $('#produitModal').modal('hide');
          },
          error: (error: any) => {
            console.error('Erreur lors de la mise à jour du produit', error);
            this.toastr.error('Erreur lors de la mise à jour du produit', 'Erreur');
          }
        });
      } else {
        this.produitService.createProduit(produit).subscribe({
          next: () => {
            this.toastr.success('Produit ajouté avec succès', 'Succès');
            this.fetchProduits();
            $('#produitModal').modal('hide');
          },
          error: (error: any) => {
            console.error('Erreur lors de l\'ajout du produit', error);
            this.toastr.error('Erreur lors de l\'ajout du produit', 'Erreur');
          }
        });
      }
    } else {
      this.toastr.error('Veuillez corriger les erreurs dans le formulaire', 'Erreur');
    }
  }


}