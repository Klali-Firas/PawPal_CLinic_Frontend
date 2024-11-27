import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products = [
    { id: 1, name: 'Product 1', category: 'Category 1', price: 100, image: 'path/to/image1.jpg' },
    { id: 2, name: 'Product 2', category: 'Category 2', price: 200, image: 'path/to/image2.jpg' },
    { id: 3, name: 'Product 3', category: 'Category 3', price: 300, image: 'path/to/image3.jpg' }
  ];

  constructor(private router: Router) {}

  viewDetails(productId: number) {
    this.router.navigate(['/product-detail', productId]);
  }
}