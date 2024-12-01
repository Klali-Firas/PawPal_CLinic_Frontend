import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
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
  showEditAnimalPopup = false;
  editAnimalForm: FormGroup;
  selectedAnimal: Animaux | null = null;

  constructor(
    private fb: FormBuilder,
    private animauxService: AnimauxService,
    private userService: UtilisateurService
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
        },
        error: (error: any) => {
          console.error('Error updating animal', error);
        }
      });
    }
  }

  nonNegativeValidator(control: AbstractControl): ValidationErrors | null {
    return control.value !== null && control.value < 0 ? { nonNegative: true } : null;
  }
}