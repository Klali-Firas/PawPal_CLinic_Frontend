import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private product: any;

  setProduct(product: any) {
    this.product = product;
  }

  getProduct() {
    return this.product;
  }
}