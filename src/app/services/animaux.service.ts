import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Animaux } from '../interfaces/interfaces';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnimauxService {

  constructor(private http: HttpClient) { }
  apiUrl = environment.apiUrl + '/api/public/animaux';

  getAnimauxByProprietaireId(proprietaireId: number): Observable<Animaux[]> {
    return this.http.get<Animaux[]>(`${this.apiUrl}/proprietaire/${proprietaireId}`);
  }

  // Get all animals
  getAllAnimaux(): Observable<Animaux[]> {
    return this.http.get<Animaux[]>(this.apiUrl);
  }

  // Get animal by ID
  getAnimauxById(id: number): Observable<Animaux> {
    return this.http.get<Animaux>(`${this.apiUrl}/${id}`);
  }

  // Create new animal
  createAnimaux(animaux: Animaux): Observable<Animaux> {
    return this.http.post<Animaux>(this.apiUrl, animaux);
  }

  // Update existing animal
  updateAnimaux(id: number, animaux: Animaux): Observable<Animaux> {
    return this.http.put<Animaux>(`${this.apiUrl}/${id}`, animaux);
  }

  // Delete animal by ID
  deleteAnimaux(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
