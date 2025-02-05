import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateurs } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  login(): void {
    window.location.href = `${environment.apiUrl}/oauth2/authorization/google`;
  }

  fetchUser(): void {
    this.http.get<{ user: Utilisateurs, photo: string, token: string }>(`${environment.apiUrl}/user?accountType=${sessionStorage.getItem('role')}`, { withCredentials: true }).subscribe({
      next: (data) => {
        console.log('data', data);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('photo', data.photo);
        localStorage.setItem('token', data.token);
        return data;
      },
      error: (error) => {
        console.error('Error fetching user data:', error);  // Debugging: Log any errors
      }
    })
  }

  logout(): void {
    this.http.post(`${environment.apiUrl}/logout`, {}, { withCredentials: true }).subscribe({
      next: () => {
        localStorage.removeItem('user');
        localStorage.removeItem('photo');
        localStorage.removeItem('token');
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error during logout:', error);  // Debugging: Log any errors
      }
    });
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
}
