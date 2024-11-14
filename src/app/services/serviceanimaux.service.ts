import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServicesAnimaux } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ServiceAnimauxService {

  private apiUrl = 'http://localhost:4332/api/public/services-animaux';

  constructor(private http: HttpClient) { }

  // Get all services animaux
  getAllServicesAnimaux(): Observable<ServicesAnimaux[]> {
    return this.http.get<ServicesAnimaux[]>(this.apiUrl);
  }

  // Get services animaux by ID
  getServicesAnimauxById(id: number): Observable<ServicesAnimaux> {
    return this.http.get<ServicesAnimaux>(`${this.apiUrl}/${id}`);
  }

  // Create new services animaux
  createServicesAnimaux(servicesAnimaux: ServicesAnimaux): Observable<ServicesAnimaux> {
    return this.http.post<ServicesAnimaux>(this.apiUrl, servicesAnimaux);
  }

  // Update existing services animaux
  updateServicesAnimaux(id: number, servicesAnimaux: ServicesAnimaux): Observable<ServicesAnimaux> {
    return this.http.put<ServicesAnimaux>(`${this.apiUrl}/${id}`, servicesAnimaux);
  }

  // Delete services animaux by ID
  deleteServicesAnimaux(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
