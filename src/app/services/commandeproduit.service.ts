import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
export interface CommandeProduit {
  id: number;
  // Add other properties as per your CommandeProduitDto
  // For example:
  // productId: number;
  // quantity: number;
  // price: number;
}
@Injectable({
  providedIn: 'root'
})
export class CommandeProduitService {
  private apiUrl = 'http://localhost:4332/api/public/commande-produits';

  constructor(private http: HttpClient) {}

  getAllCommandeProduits(): Observable<CommandeProduit[]> {
    return this.http.get<CommandeProduit[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getCommandeProduitById(id: number): Observable<CommandeProduit> {
    return this.http.get<CommandeProduit>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createCommandeProduit(commandeProduit: CommandeProduit): Observable<CommandeProduit> {
    return this.http.post<CommandeProduit>(this.apiUrl, commandeProduit).pipe(
      catchError(this.handleError)
    );
  }

  updateCommandeProduit(id: number, commandeProduit: CommandeProduit): Observable<CommandeProduit> {
    return this.http.put<CommandeProduit>(`${this.apiUrl}/${id}`, commandeProduit).pipe(
      catchError(this.handleError)
    );
  }

  deleteCommandeProduit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Server-side error: Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}