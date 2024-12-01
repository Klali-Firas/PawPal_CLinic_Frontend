import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navaccueil',
  templateUrl: './navaccueil.component.html',
  styleUrls: ['./navaccueil.component.css']
})
export class NavaccueilComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
  }

  login() {
    sessionStorage.setItem('role', 'proprietaire');
    this.authService.login();
  }

  navigateToShop() {
    this.router.navigate(['shop']).then(() => {
    });
  }

  navigateToCart() {
    this.router.navigate(['shop', 'cart']).then(() => {
    });
  }

}
