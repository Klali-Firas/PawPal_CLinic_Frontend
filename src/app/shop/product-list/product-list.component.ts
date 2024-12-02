import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.Service';  // Adjust the import path as necessary
import { ToastrService } from 'ngx-toastr';
import { Produits } from 'src/app/interfaces/interfaces';
import { ProduitService } from 'src/app/services/produit.service';

declare var $: any;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Produits[] = [];
  selectedProduct: Produits | null = null;
  errorMessage: string = '';

  constructor(
    private productService: ProduitService,
    private cartService: CartService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.productService.getAllProduits().subscribe(
      (data) => {
        this.products = data;
        console.log(data);
      },
      (error) => {
        this.errorMessage = error;
        console.error('There was an error!', error);
      }
    );
  }

  openProductModal(productId: number): void {
    this.productService.getProduitById(productId).subscribe(
      (product) => {
        this.selectedProduct = product;
        $('#productModal').modal('show');
      },
      (error) => {
        console.error('Error fetching product details', error);
      }
    );
  }

  addToCart(product: Produits): void {
    this.cartService.addToCart(product);
    this.toastr.success(product.nomProduit + ' ajouté au panier');
  }
}