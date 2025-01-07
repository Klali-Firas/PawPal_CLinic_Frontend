import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Animaux, RendezVous, Utilisateurs } from 'src/app/interfaces/interfaces';
import { Router } from '@angular/router';

import { firstValueFrom } from 'rxjs';
import { AnimauxService } from 'src/app/services/animaux.service';
import { RendezvousService } from 'src/app/services/rendezvous.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-animaux-vet',
  templateUrl: './list-animaux-vet.component.html',
  styleUrls: ['./list-animaux-vet.component.css']
})
export class ListAnimauxVetComponent implements OnInit {
  animauxList: Animaux[] = [];
  proprietaires: Map<number, Utilisateurs> = new Map<number, Utilisateurs>();

  showEditAnimalPopup = false;
  editAnimalForm: FormGroup;
  selectedAnimal: Animaux | null = null;
  allRendezVous: RendezVous[] = [];
  veterinaires: Map<number, Utilisateurs> = new Map();

  currentPage: number = 1;
  itemsPerPage: number = 7;

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private animauxService: AnimauxService,
    private userService: UtilisateurService,
    private rendezvousService: RendezvousService,
    private utilisateurService: UtilisateurService,
    private router: Router
  ) {
    this.editAnimalForm = this.fb.group({
      nom: ['', Validators.required],
      race: [''],
      age: [null, [Validators.required, this.nonNegativeValidator]],
    });
  }

  ngOnInit(): void {
    this.animauxService.getAllAnimaux().subscribe({
      next: (data) => {
        this.animauxList = data.sort((a, b) => new Date(b.creeLe!).getTime() - new Date(a.creeLe!).getTime());
        this.animauxList.forEach(animal => {
          this.getProprietaireByAnimalId(animal.id);
        });
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des animaux!', error);
        this.toastr.error('Échec du chargement des animaux!');
      }
    });

    this.getAllRendezVous();
    this.getAllVeterinaires();
  }

  getProprietaireByAnimalId(id: number): void {
    this.userService.getProprietaireByAnimalId(id).subscribe({
      next: (data) => this.proprietaires.set(id, data),
      error: (error) => console.error('Erreur lors de la récupération du propriétaire!', error)
    });
  }

  openEditAnimalPopup(animal: Animaux): void {
    this.selectedAnimal = animal;
    this.editAnimalForm.patchValue({
      nom: animal.nom,
      race: animal.race,
      age: animal.age,
    });
    this.showEditAnimalPopup = true;
  }

  closeEditAnimalPopup(): void {
    this.showEditAnimalPopup = false;
    this.selectedAnimal = null;
  }

  onEditAnimal(): void {
    if (this.editAnimalForm.valid && this.selectedAnimal) {
      const updatedAnimal: Animaux = {
        ...this.selectedAnimal,
        ...this.editAnimalForm.value,
      };

      this.animauxService.updateAnimaux(updatedAnimal.id, updatedAnimal).subscribe({
        next: (response: Animaux) => {
          const index = this.animauxList.findIndex(animal => animal.id === response.id);
          if (index !== -1) {
            this.animauxList[index] = response;
          }
          this.closeEditAnimalPopup();
          this.toastr.success('Animal mis à jour avec succès!');
        },
        error: (error: any) => {
          console.error('Erreur lors de la mise à jour de l\'animal', error);
          this.toastr.error('Échec de la mise à jour de l\'animal!');
        }
      });
    }
  }

  nonNegativeValidator(control: AbstractControl): ValidationErrors | null {
    return control.value !== null && control.value < 0 ? { nonNegative: true } : null;
  }

  voirHistorique(animal: Animaux): void {
    this.selectedAnimal = animal;
  }

  async getAllRendezVous(): Promise<void> {
    try {
      this.allRendezVous = await firstValueFrom(this.rendezvousService.getAllRendezVous());
    } catch (error) {
      console.error('Erreur lors de la récupération des rendez-vous', error);
    }
  }

  async getAllVeterinaires(): Promise<void> {
    try {
      const veterinaires = await firstValueFrom(this.utilisateurService.getAllVeterinaires());
      veterinaires.forEach(vet => this.veterinaires.set(vet.id, vet));
    } catch (error) {
      console.error('Erreur lors de la récupération des vétérinaires', error);
    }
  }

  getRendezVousForAnimal(animalId: number): RendezVous[] {
    return this.allRendezVous.filter(r => r.animalId === animalId);
  }

  get paginatedAnimauxList(): Animaux[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.animauxList.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if ((this.currentPage * this.itemsPerPage) < this.animauxList.length) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  navigateToAjoutAnimal(): void {
    this.router.navigate(['/veterinaire/ajoutAnimal']);
  }
}