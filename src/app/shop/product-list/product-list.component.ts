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
  paginatedProducts: Produits[] = [];
  selectedProduct: Produits | null = null;
  errorMessage: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalPages: number[] = [];
  searchTerm: string = '';

  constructor(
    private productService: ProduitService,
    private cartService: CartService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.productService.getAllProduits().subscribe(
      (data) => {
        this.products = data;
        this.calculateTotalPages();
        this.updatePaginatedProducts();
        console.log(data);
      },
      (error) => {
        this.errorMessage = error;
        console.error('There was an error!', error);
      }
    );
    this.updatePaginatedProducts();
  }

  calculateTotalPages(): void {
    const totalItems = this.products.length;
    const totalPages = Math.ceil(totalItems / this.itemsPerPage);
    this.totalPages = Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  updatePaginatedProducts(): void {
    const filteredProducts = this.products.filter(product =>
      product.nomProduit.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = filteredProducts.slice(startIndex, endIndex).map(product => ({
      ...product,
      prix: parseFloat(product.prix.toFixed(2))
    }));
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages.length) {
      this.currentPage = page;
      this.updatePaginatedProducts();
    }
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

  onSearchTermChange(): void {
    this.currentPage = 1;
    this.updatePaginatedProducts();
  }
}