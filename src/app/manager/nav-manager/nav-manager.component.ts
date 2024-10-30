import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-manager',
  templateUrl: './nav-manager.component.html',
  styleUrls: ['./nav-manager.component.css']
})
export class NavManagerComponent {
  constructor(private router: Router) { }

  navigateToAppointments() {
    this.router.navigate(['manager', 'rendezvous']);
  }

}
