import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produits } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private apiUrl = 'http://localhost:4332/api/public/produits';

  constructor(private http: HttpClient) { }

  // Get all products
  getAllProduits(): Observable<Produits[]> {
    return this.http.get<Produits[]>(this.apiUrl);
  }

  // Get product by ID
  getProduitById(id: number): Observable<Produits> {
    return this.http.get<Produits>(`${this.apiUrl}/${id}`);
  }

  // Create new product
  createProduit(produit: Produits): Observable<Produits> {
    return this.http.post<Produits>(this.apiUrl, produit);
  }

  // Update existing product
  updateProduit(id: number, produit: Produits): Observable<Produits> {
    return this.http.put<Produits>(`${this.apiUrl}/${id}`, produit);
  }

  // Delete product by ID
  deleteProduit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}