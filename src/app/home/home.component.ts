import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  user: any;

  constructor(private ngxSpinner: NgxSpinnerService, private authService: AuthService, private toaster: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.ngxSpinner.show();  // Show spinner

    // Fetch authenticated user's info from backend
    this.authService.fetchUser()
    setTimeout(() => {
      this.user = JSON.parse(localStorage.getItem('user') || '{}');
      this.user.photo = localStorage.getItem('photo');
      this.ngxSpinner.hide();  // Hide spinner
      if (this.user.role === 'proprietaire') {
        this.router.navigate(['/proprietaire']);
      } else if (this.user.role === 'veterinaire') {
        this.router.navigate(['/veterinaire']);
      } else {
        this.router.navigate(['/manager']);
      }

    }, 300);
    this.toaster.success('Logged in Successfully', 'Welcome to the home page');

  }

  logout(): void {
    this.authService.logout();
  }

}
