import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utilisateurs } from '../interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(private http: HttpClient) { }
  apiUrl = 'http://localhost:4332/api/public/utilisateurs';


  getVeterinaireById(id: number): Observable<Utilisateurs> {
    return this.http.get<Utilisateurs>(`${this.apiUrl}/veterinaire/${id}`);
  }

  getUtilisateurById(id: number): Observable<Utilisateurs> {
    return this.http.get<Utilisateurs>(`${this.apiUrl}/${id}`);
  }

  getProprietaireByAnimalId(animalId: number): Observable<Utilisateurs> {
    return this.http.get<Utilisateurs>(`${this.apiUrl}/proprietaire/animal/${animalId}`);
  }

  getAllVeterinaires(): Observable<Utilisateurs[]> {
    return this.http.get<Utilisateurs[]>(`${this.apiUrl}/veterinaires`);
  }
  getAllUtilisateurs(): Observable<Utilisateurs[]> {
    return this.http.get<Utilisateurs[]>(`${this.apiUrl}`);
  }
  getLoggedInUser(): Observable<Utilisateurs> {
    return this.http.get<Utilisateurs>(`${this.apiUrl}/loggedInUser`);
  }
}

