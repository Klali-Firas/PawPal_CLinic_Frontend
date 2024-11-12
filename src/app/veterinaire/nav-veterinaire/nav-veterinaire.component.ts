import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-veterinaire',
  templateUrl: './nav-veterinaire.component.html',
  styleUrls: ['./nav-veterinaire.component.css']
})
export class NavVeterinaireComponent {
  constructor(private router: Router) { }
  navigateToAppointments() {
    this.router.navigate(['proprietaire', 'rendezvous']);
  }
}
