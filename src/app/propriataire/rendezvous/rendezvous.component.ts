import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Animaux, Services, Utilisateurs, RendezVous } from 'src/app/interfaces/interfaces';
import { AnimauxService } from 'src/app/services/animaux.service';
import { ServiceService } from 'src/app/services/service.service';
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
  services: Services[] = [];

  constructor(
    private fb: FormBuilder,
    private animauxService: AnimauxService,
    private serviceService: ServiceService,
    private rendezvousService: RendezvousService,
    private toaster: ToastrService
  ) {
    this.rendezvousForm = this.fb.group({
      proprietaire: [{ value: this.user.nom + ' ' + this.user.prenom, disabled: true }, Validators.required],
      animalId: [null, Validators.required],
      dateRendezVous: [null, Validators.required],
      motif: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAnimaux();
    this.getServices();
  }

  getAnimaux(): void {
    this.animauxService.getAnimauxByProprietaireId(this.user.id).subscribe({
      next: (response: Animaux[]) => {
        this.animaux = response;
      },
      error: (error: any) => {
        console.error('Error getting animaux', error);
      }
    });
  }

  getServices(): void {
    this.serviceService.getAllServices().subscribe({
      next: (response: Services[]) => {
        this.services = response;
      },
      error: (error: any) => {
        console.error('Error getting services', error);
      }
    });
  }

  onSubmit(): void {
    if (this.rendezvousForm.valid) {
      const formValue = this.rendezvousForm.value;
      const selectedService = this.services.find(service => service.id == formValue.motif);
      console.log(selectedService);
      if (!selectedService) {
        this.toaster.error('Service not found');
        return;
      }

      const rendezVous: RendezVous = {
        id: 0, // Assuming the ID will be generated by the backend
        animalId: formValue.animalId,
        veterinaireId: null, // Assuming the current user is the veterinarian
        dateRendezVous: new Date(formValue.dateRendezVous),
        statut: 'en_attente',
        motif: selectedService.id,
        creeLe: new Date(),
        remarques: null
      };

      this.rendezvousService.createRendezVous(rendezVous).subscribe({
        next: (createdRendezVous: RendezVous) => {


          this.toaster.success('Rendez-vous created successfully');
          this.rendezvousForm.reset();
          this.rendezvousForm.patchValue({ proprietaire: this.user.nom + ' ' + this.user.prenom });
        },
        error: (error: any) => {
          console.error('Error creating rendez-vous', error);
          this.toaster.error('Error creating rendez-vous');
        }
      });
    }
  }
}