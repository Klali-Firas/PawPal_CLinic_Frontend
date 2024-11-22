import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  createRendezVous(rendezVous: RendezVous, email: string): Observable<RendezVous> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'  // Set the content type to JSON
    });

    // POST request to create the rendezvous and send the email
    return this.http.post<RendezVous>(`${this.apiUrl}?email=${email}`, rendezVous, { headers });
  }

  getRendezVousByVeterinaireId(veterinaireId: number): Observable<RendezVous[]> {
    const url = `${this.apiUrl}/veterinaire/${veterinaireId}`;
    return this.http.get<RendezVous[]>(url);
  }

}
