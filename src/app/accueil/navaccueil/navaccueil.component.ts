import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navaccueil',
  templateUrl: './navaccueil.component.html',
  styleUrls: ['./navaccueil.component.css']
})
export class NavaccueilComponent implements OnInit {
  constructor(private authService: AuthService) { }
  ngOnInit(): void {
  }

  login() {
    sessionStorage.setItem('role', 'proprietaire');
    this.authService.login();
  }
}
