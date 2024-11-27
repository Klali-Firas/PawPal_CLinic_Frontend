import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateurs } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navpropriataire',
  templateUrl: './navpropriataire.component.html',
  styleUrls: ['./navpropriataire.component.css']
})
export class NavpropriataireComponent implements OnInit {
  user: Utilisateurs = JSON.parse(localStorage.getItem('user') || '{}');
  photo: string = localStorage.getItem('photo') || '';
  constructor(private router: Router, private renderer: Renderer2, private el: ElementRef, private authService: AuthService) { }
  ngOnInit(): void {
    this.updateActiveClass();
  }

  private updateActiveClass() {
    const currentUrl = this.router.url;
    const activeRoute = currentUrl.split('/').pop();
    const liElements = this.el.nativeElement.querySelectorAll('li');
    // console.log(activeRoute);

    liElements.forEach((li: HTMLElement) => {
      if (li.getAttribute('data-route') === activeRoute) {
        this.renderer.addClass(li, 'active');
      } else {
        this.renderer.removeClass(li, 'active');
      }
    });
  }

  onLogout() {
    this.authService.logout();
  }

  navigateToAppointments() {
    this.router.navigate(['proprietaire', 'rendezvous']).then(() => {
      this.updateActiveClass();
    });
  }

  navigateToMyAppointments() {
    this.router.navigate(['proprietaire', 'mes-rendez-vous']).then(() => {
      this.updateActiveClass();
    });
  }


}
