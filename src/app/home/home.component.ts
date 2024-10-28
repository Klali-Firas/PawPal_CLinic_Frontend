import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  user: any;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    // Fetch authenticated user's info from backend
    this.http.get('http://localhost:4332/user', { withCredentials: true }).subscribe(
      data => {
        this.user = data;
        console.log('User data:', this.user);  // Debugging: Log user data to console
      },
      error => {
        console.error('Error fetching user data:', error);  // Debugging: Log any errors
      }
    );
  }

  logout(): void {
    this.http.post('http://localhost:4332/logout', {}, { withCredentials: true }).subscribe(
      () => {
        this.user = null;
        // Manually handle the redirect after successful logout
        window.location.href = 'http://localhost:4200/';
      },
      error => {
        console.error('Error during logout:', error);  // Debugging: Log any errors
      }
    );
  }

}
