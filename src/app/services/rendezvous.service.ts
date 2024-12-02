import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RendezVous } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RendezvousService {

  constructor(private http: HttpClient) { }
  apiUrl = `${environment.apiUrl}/api/public/rendezvous`;

  getAllRendezVous(): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(this.apiUrl);
  }

  assignVeterinaire(rendezVousId: number, veterinaireId: number): Observable<RendezVous> {
    const url = `${this.apiUrl}/${rendezVousId}/assign-veterinaire/${veterinaireId}`;
    return this.http.put<RendezVous>(url, {});
  }

  createRendezVous(rendezVous: RendezVous): Observable<RendezVous> {
    return this.http.post<RendezVous>(this.apiUrl, rendezVous);
  }

  getRendezVousByVeterinaireId(veterinaireId: number): Observable<RendezVous[]> {
    const url = `${this.apiUrl}/veterinaire/${veterinaireId}`;
    return this.http.get<RendezVous[]>(url);
  }

  updateRendezVous(id: number, rendezVous: RendezVous): Observable<RendezVous> {
    return this.http.put<RendezVous>(`${this.apiUrl}/${id}`, rendezVous);
  }
  getRendezVousByUserId(userId: number): Observable<RendezVous[]> {
    const url = `${this.apiUrl}/user/${userId}`;
    return this.http.get<RendezVous[]>(url);
  }

  exportRendezVousToCsv(): Observable<Blob> {
    const url = `${this.apiUrl}/export/csv`;
    return this.http.get(url, { responseType: 'blob' });
  }
}