import { Component } from '@angular/core';
import { Avis, Commandes } from '../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) { }
  avis?: Avis[];
  ngOnInit(): void {

  }

  navigateToManager() {
    this.router.navigate(["manager"]);
  }

  navigateToProprietaire() {
    this.router.navigate(["proprietaire"])
  }

  login() {
    sessionStorage.setItem('role', 'proprietaire');
    this.authService.login();
  }
}