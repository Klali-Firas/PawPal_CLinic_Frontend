import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.Service'; // Adjust the import path as necessary
import { Produits } from 'src/app/interfaces/interfaces';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-produit-detail',
  templateUrl: './produit-detail.component.html',
  styleUrls: ['./produit-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Produits | undefined;

  constructor(private route: ActivatedRoute, private productService: ProduitService, private cartService: CartService) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProduitById(+productId).subscribe((data) => {
        this.product = data;
      });
    }
  }

  addToCart(product: Produits) {
    this.cartService.addToCart(product);
  }
}