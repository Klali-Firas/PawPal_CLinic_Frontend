import { Component, OnInit } from '@angular/core';
import { Animaux, Utilisateurs } from 'src/app/interfaces/interfaces';
import { AnimauxService } from 'src/app/services/animaux.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-list-animaux-vet',
  templateUrl: './list-animaux-vet.component.html',
  styleUrls: ['./list-animaux-vet.component.css']
})
export class ListAnimauxVetComponent implements OnInit {
  animauxList: Animaux[] = [];

  proprietaires: Map<number, Utilisateurs> = new Map<number, Utilisateurs>();

  constructor(private animauxService: AnimauxService, private userService: UtilisateurService) { }

  ngOnInit(): void {
    this.animauxService.getAllAnimaux().subscribe({
      next: (data) => {
        this.animauxList = data;
        this.animauxList.forEach(animal => {
          this.getProprietaireByAnimalId(animal.id);
        });
      },

      error: (error) => console.error('There was an error!', error)
    });
  }

  getProprietaireByAnimalId(id: number): void {
    this.userService.getProprietaireByAnimalId(id).subscribe({
      next: (data) => this.proprietaires.set(id, data),
      error: (error) => console.error('There was an error!', error)
    });
  }


}
