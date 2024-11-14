import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { OnInit, Renderer2, ElementRef } from '@angular/core';
import { Utilisateurs } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-nav-veterinaire',
  templateUrl: './nav-veterinaire.component.html',
  styleUrls: ['./nav-veterinaire.component.css']
})


export class NavVeterinaireComponent implements OnInit {

  user: Utilisateurs = JSON.parse(localStorage.getItem('user') || '{}');
  photo: string = localStorage.getItem('photo') || '';
  constructor(private router: Router, private renderer: Renderer2, private el: ElementRef, private authService: AuthService) { }

  private updateActiveClass() {
    const currentUrl = this.router.url;
    const activeRoute = currentUrl.split('/').pop();
    const liElements = this.el.nativeElement.querySelectorAll('li');
    // console.log(activeRoute);

    liElements.forEach((li: HTMLElement) => {
      console.log(li.getAttribute('data-route'));
      if (li.getAttribute('data-route') === activeRoute) {
        this.renderer.addClass(li, 'active');
      } else {
        this.renderer.removeClass(li, 'active');
      }
    });
  }

  ngOnInit() {
    this.updateActiveClass();
  }
  onRendezVous() {
    this.router.navigate(['veterinaire', 'rendez-vous']).then(() => {
      this.updateActiveClass();
    });
  }

  onListAnimauxVet() {
    this.router.navigate(['veterinaire', 'ListAnimauxVet']).then(() => {
      this.updateActiveClass();
    });
  }



  onLogout() {
    this.authService.logout();
  }
}

