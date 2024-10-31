import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navpropriataire',
  templateUrl: './navpropriataire.component.html',
  styleUrls: ['./navpropriataire.component.css']
})
export class NavpropriataireComponent {
  constructor(private router: Router) { }
  navigateToAppointments() {
    this.router.navigate(['proprietaire', 'rendezvous']);
  }
}
