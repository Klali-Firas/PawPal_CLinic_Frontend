import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RendezVous } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class RendezvousService {

  constructor(private http: HttpClient) { }
  apiUrl = 'http://localhost:4332/api/public/rendezvous';


  getAllRendezVous(): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(this.apiUrl);
  }

  assignVeterinaire(rendezVousId: number, veterinaireId: number): Observable<RendezVous> {
    const url = `${this.apiUrl}/${rendezVousId}/assign-veterinaire/${veterinaireId}`;
    return this.http.put<RendezVous>(url, {});
  }
}
