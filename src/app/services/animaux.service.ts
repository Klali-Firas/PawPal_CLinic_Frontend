import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Animaux } from '../interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimauxService {

  constructor(private http: HttpClient) { }
  apiUrl = 'http://localhost:4332/api/public/animaux';

  getAnimauxByProprietaireId(proprietaireId: number): Observable<Animaux[]> {
    return this.http.get<Animaux[]>(`${this.apiUrl}/proprietaire/${proprietaireId}`);
  }
}
