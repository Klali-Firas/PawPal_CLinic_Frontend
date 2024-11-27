import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Animaux, RendezVous, Utilisateurs } from 'src/app/interfaces/interfaces';
import { AnimauxService } from 'src/app/services/animaux.service';
import { RendezvousService } from 'src/app/services/rendezvous.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-list-animaux-vet',
  templateUrl: './list-animaux-vet.component.html',
  styleUrls: ['./list-animaux-vet.component.css']
})
export class ListAnimauxVetComponent implements OnInit {
  animauxList: Animaux[] = [];
  proprietaires: Map<number, Utilisateurs> = new Map<number, Utilisateurs>();
  selectedAnimal?: Animaux;
  allRendezVous: RendezVous[] = [];
  veterinaires: Map<number, Utilisateurs> = new Map();

  constructor(
    private animauxService: AnimauxService,
    private userService: UtilisateurService,
    private rendezvousService: RendezvousService,
    private utilisateurService: UtilisateurService
  ) { }

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

    this.getAllRendezVous();
    this.getAllVeterinaires();
  }

  getProprietaireByAnimalId(id: number): void {
    this.userService.getProprietaireByAnimalId(id).subscribe({
      next: (data) => this.proprietaires.set(id, data),
      error: (error) => console.error('There was an error!', error)
    });
  }

  voirHistorique(animal: Animaux): void {
    this.selectedAnimal = animal;
  }

  async getAllRendezVous(): Promise<void> {
    try {
      this.allRendezVous = await firstValueFrom(this.rendezvousService.getAllRendezVous());
    } catch (error) {
      console.error('Error getting rendez-vous', error);
    }
  }

  async getAllVeterinaires(): Promise<void> {
    try {
      const veterinaires = await firstValueFrom(this.utilisateurService.getAllVeterinaires());
      veterinaires.forEach(vet => this.veterinaires.set(vet.id, vet));
    } catch (error) {
      console.error('Error getting veterinaires', error);
    }
  }

  getRendezVousForAnimal(animalId: number): RendezVous[] {
    return this.allRendezVous.filter(r => r.animalId === animalId);
  }
}