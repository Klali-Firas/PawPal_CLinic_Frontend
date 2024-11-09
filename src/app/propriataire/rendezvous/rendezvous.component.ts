import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Animaux, RendezVous, Utilisateurs } from 'src/app/interfaces/interfaces';
import { AnimauxService } from 'src/app/services/animaux.service';
import { RendezvousService } from 'src/app/services/rendezvous.service';

@Component({
  selector: 'app-rendezvous',
  templateUrl: './rendezvous.component.html',
  styleUrls: ['./rendezvous.component.css']
})
export class RendezvousComponent implements OnInit {
  rendezvousForm: FormGroup;
  user: Utilisateurs = JSON.parse(localStorage.getItem('user') || '{}');
  animaux: Animaux[] = [];

  constructor(private fb: FormBuilder, private rendevousservice: RendezvousService, private animauxService: AnimauxService, private toaster: ToastrService) {
    this.rendezvousForm = this.fb.group({
      proprietaire: [{ value: this.user.nom + ' ' + this.user.prenom, disabled: true }, Validators.required],
      animalId: [null, Validators.required],
      dateRendezVous: [null, Validators.required],
      motif: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAnimaux();
  }

  onSubmit(): void {
    if (this.rendezvousForm.valid) {
      const rendezvous: RendezVous = this.rendezvousForm.value;
      const formValue = this.rendezvousForm.value;
      rendezvous.dateRendezVous = new Date(formValue.dateRendezVous);
      rendezvous.creeLe = new Date();
      rendezvous.statut = "en_attente";
      rendezvous.veterinaireId = null;
      // Handle form submission, e.g., send it to a service
      this.rendevousservice.createRendezVous(rendezvous).subscribe({
        next: () => {
          this.toaster.success('Rendez-vous ajouté avec succès');
          this.rendezvousForm.reset();
          this.rendezvousForm.patchValue({ proprietaire: this.user.nom + ' ' + this.user.prenom });

        }, error: (error: any) => {
          console.error('Error adding rendezvous', error);
        }
      });

    }
  }

  getAnimaux(): void {
    this.animauxService.getAnimauxByProprietaireId(this.user.id).subscribe({
      next: (response: Animaux[]) => {

        this.animaux = response;
        console.log('Animaux', this.animaux[0].id);
      }, error: (error: any) => {
        console.error('Error getting animaux', error);
      }
    });
  }
}