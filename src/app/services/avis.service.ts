import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Avis } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AvisService {

  private apiUrl = `${environment.apiUrl}/api/public/avis`;

  constructor(private http: HttpClient) { }

  // Get all avis
  getAllAvis(): Observable<Avis[]> {
    return this.http.get<Avis[]>(this.apiUrl);
  }

  // Get avi by ID
  getAviById(id: number): Observable<Avis> {
    return this.http.get<Avis>(`${this.apiUrl}/${id}`);
  }

  // Create new avi
  createAvi(avi: Avis): Observable<Avis> {
    return this.http.post<Avis>(this.apiUrl, avi);
  }

  // Update existing avi
  updateAvi(id: number, avi: Avis): Observable<Avis> {
    return this.http.put<Avis>(`${this.apiUrl}/${id}`, avi);
  }

  // Delete avi by ID
  deleteAvi(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Get avis by rendezvous ID
  getAvisByRendezVousId(rendezVousId: number): Observable<Avis[]> {
    return this.http.get<Avis[]>(`${this.apiUrl}/rendezvous/${rendezVousId}`);
  }

  // Get avi by rendezvous ID and proprietaire ID
  getAviByRendezVousIdAndProprietaireId(rendezVousId: number, proprietaireId: number): Observable<Avis> {
    return this.http.get<Avis>(`${this.apiUrl}/rendezvous/${rendezVousId}/proprietaire/${proprietaireId}`);
  }
}