import { Component, OnInit } from '@angular/core';
import { Animaux, RendezVous, Utilisateurs } from 'src/app/interfaces/interfaces';
import { AnimauxService } from 'src/app/services/animaux.service';
import { RendezvousService } from 'src/app/services/rendezvous.service';

@Component({
  selector: 'app-rendez-vous-veterinaire',
  templateUrl: './rendez-vous-veterinaire.component.html',
  styleUrls: ['./rendez-vous-veterinaire.component.css']
})
export class RendezVousVeterinaireComponent implements OnInit {

  constructor(private rendezVousService: RendezvousService, private animauxService: AnimauxService) { }

  user: Utilisateurs = JSON.parse(localStorage.getItem('user') || '{}');
  rendezVous: RendezVous[] = [];
  page: number = 1;
  animaux: Map<number, Animaux> = new Map();

  ngOnInit(): void {
    this.getRendezVousByVeterinaireId();

  }

  getRendezVousByVeterinaireId() {
    this.rendezVousService.getRendezVousByVeterinaireId(this.user.id).subscribe(rendezVous => {
      this.rendezVous = rendezVous;
      rendezVous.forEach(rendezVous => {
        this.getAnimalById(rendezVous.animalId);
      });
      console.log(rendezVous);
    });
  }

  getAnimalById(id: number) {
    if (!this.animaux.has(id)) {
      this.animauxService.getAnimauxById(id).subscribe(animal => {
        this.animaux.set(id, animal);
      });
    }
  }
}