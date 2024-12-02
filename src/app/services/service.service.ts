import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Services } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private apiUrl = `${environment.apiUrl}/api/public/services`;

  constructor(private http: HttpClient) { }

  // Get all services
  getAllServices(): Observable<Services[]> {
    return this.http.get<Services[]>(this.apiUrl);
  }

  // Get service by ID
  getServiceById(id: number): Observable<Services> {
    return this.http.get<Services>(`${this.apiUrl}/${id}`);
  }

  // Create new service
  createService(service: Services): Observable<Services> {
    return this.http.post<Services>(this.apiUrl, service);
  }

  // Update existing service
  updateService(id: number, service: Services): Observable<Services> {
    return this.http.put<Services>(`${this.apiUrl}/${id}`, service);
  }

  // Delete service by ID
  deleteService(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
