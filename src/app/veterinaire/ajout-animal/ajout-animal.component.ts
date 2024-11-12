import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { race } from 'rxjs';
import { Animaux, Utilisateurs } from 'src/app/interfaces/interfaces';
import { AnimauxService } from 'src/app/services/animaux.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-ajout-animal',
  templateUrl: './ajout-animal.component.html',
  styleUrls: ['./ajout-animal.component.css']
})
export class AjoutAnimalComponent implements OnInit{
  utilisateurs: Utilisateurs[] = [];
  selectedOwnerId: number | null = null;  // To bind the selected user
  animalForm: FormGroup;
  constructor(private utilisateurService: UtilisateurService , private fb: FormBuilder, private animalService:AnimauxService )  {
    this.animalForm = this.fb.group({
      nom: [null, Validators.required],
      race: [null],
      age: [null],
      historiqueMedical: [null],
      proprietaireId: [null, Validators.required], 
   
    });
  }

  ngOnInit(): void {
    this.loadUtilisateurs();
  }

  loadUtilisateurs(): void {
    this.utilisateurService.getAllUtilisateurs().subscribe((data) => {
      // Filter users based on role 'propriétaire'
      this.utilisateurs = data.filter(user => user.role === 'proprietaire');
    });
  }



  onSubmit(): void {
    if (this.animalForm.valid) {
      const formValue = this.animalForm.value;

      const newAnimal: Animaux = {
        animalId: formValue.animalId || 0,
        proprietaireId: formValue.proprietaireId,
        nom: formValue.nom,
        race: formValue.race,
        age: formValue.age,
        historiqueMedical: formValue.historiqueMedical,
        creeLe: new Date(),
      };

      console.log('Form Submitted', newAnimal);

      // Call the animal service to create the new animal
      this.animalService.createAnimaux(newAnimal).subscribe({
        next: (response: any) => {
          console.log('Animal added', response);
          // Optionally, reset the form or notify the user
        },
        error: (error: any) => {
          console.error('Error adding animal', error);
        }
      });
    }
  }

 



  
}
