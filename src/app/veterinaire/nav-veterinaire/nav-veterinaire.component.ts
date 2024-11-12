import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { OnInit, Renderer2, ElementRef } from '@angular/core';


@Component({
  selector: 'app-nav-veterinaire',
  templateUrl: './nav-veterinaire.component.html',
  styleUrls: ['./nav-veterinaire.component.css']
})


export class NavVeterinaireComponent implements OnInit {

  constructor(private router: Router, private renderer: Renderer2, private el: ElementRef) { }


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

  private updateActiveClass() {
    const currentUrl = this.router.url;
    const activeRoute = currentUrl.split('/').pop();
    const liElements = this.el.nativeElement.querySelectorAll('li');
    console.log(activeRoute);

    liElements.forEach((li: HTMLElement) => {
      if (li.getAttribute('data-route') === activeRoute) {
        this.renderer.addClass(li, 'active');
      } else {
        this.renderer.removeClass(li, 'active');
      }
    });
  }
}

