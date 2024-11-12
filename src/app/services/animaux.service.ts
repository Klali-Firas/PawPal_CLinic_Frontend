import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Animaux } from '../interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimauxService {

  private apiUrl = 'http://localhost:4332/api/public/animaux';  // Base URL of the API

  constructor(private http: HttpClient) { }

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
