import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommandeProduits } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CommandeProduitService {
  private apiUrl = 'http://localhost:4332/api/public/commande-produits';

  constructor(private http: HttpClient) { }

  getAllCommandeProduits(): Observable<CommandeProduits[]> {
    return this.http.get<CommandeProduits[]>(this.apiUrl);
  }

  getCommandeProduitById(id: number): Observable<CommandeProduits> {
    return this.http.get<CommandeProduits>(`${this.apiUrl}/${id}`);
  }

  createCommandeProduit(commandeProduit: CommandeProduits): Observable<CommandeProduits> {
    return this.http.post<CommandeProduits>(this.apiUrl, commandeProduit);
  }

  updateCommandeProduit(id: number, commandeProduit: CommandeProduits): Observable<CommandeProduits> {
    return this.http.put<CommandeProduits>(`${this.apiUrl}/${id}`, commandeProduit);
  }

  deleteCommandeProduit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getCommandeProduitsByCommandeId(id: number): Observable<CommandeProduits[]> {
    return this.http.get<CommandeProduits[]>(`${this.apiUrl}/commande/${id}`);
  }


}