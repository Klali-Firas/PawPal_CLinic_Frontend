import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { Animaux, Utilisateurs } from 'src/app/interfaces/interfaces';
import { AnimauxService } from 'src/app/services/animaux.service';


@Component({
  selector: 'app-modifier-animaux',
  templateUrl: './modifier-animaux.component.html',
  styleUrls: ['./modifier-animaux.component.css']
})
export class ModifierAnimauxComponent  implements OnInit{

  animalForm: FormGroup;
  animalId: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private animalService: AnimauxService
  ) {
    this.animalForm = this.fb.group({
      nom: [null, Validators.required],
      race: [null],
      age: [null],
      historiqueMedical: [null],
      proprietaireId: [null, Validators.required],
    });

    this.animalId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getAnimalDetails();
  }

  getAnimalDetails(): void {
    this.animalService.getAnimauxById(this.animalId).subscribe({
      next: (animal) => {
        this.animalForm.patchValue({
          nom: animal.nom,
          race: animal.race,
          age: animal.age,
          historiqueMedical: animal.historiqueMedical,
          proprietaireId: animal.proprietaireId,
        });
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de l\'animal', error);
      }
    });
  }

  onSubmit(): void {
    if (this.animalForm.valid) {
      const updatedAnimal: Animaux = {
        ...this.animalForm.value,
        id: this.animalId
      };

      this.animalService.updateAnimaux(this.animalId, updatedAnimal).subscribe({
        next: () => {
          console.log('Animal mis à jour');
          this.router.navigate(['/veterinaire/listAnimaux']); // Redirection vers la liste des animaux
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour de l\'animal', error);
        }
      });
    }
  }

}
