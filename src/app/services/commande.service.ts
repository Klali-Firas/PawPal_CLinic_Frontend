import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Commandes } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CommandeService {
  private apiUrl = `${environment.apiUrl}/api/public/commandes`;

  constructor(private http: HttpClient) { }

  getAllCommandes(): Observable<Commandes[]> {
    return this.http.get<Commandes[]>(this.apiUrl);
  }

  getCommandeById(id: number): Observable<Commandes> {
    return this.http.get<Commandes>(`${this.apiUrl}/${id}`);
  }

  createCommande(commande: Commandes): Observable<Commandes> {
    return this.http.post<Commandes>(this.apiUrl, commande);
  }

  updateCommande(id: number, commande: Commandes): Observable<Commandes> {
    return this.http.put<Commandes>(`${this.apiUrl}/${id}`, commande);
  }

  deleteCommande(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getCommandesByProprietaireId(id: number): Observable<Commandes[]> {
    return this.http.get<Commandes[]>(`${this.apiUrl}/user/${id}`);
  }
}