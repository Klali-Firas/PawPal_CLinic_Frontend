import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Services, Utilisateurs, RendezVous, Animaux } from 'src/app/interfaces/interfaces';
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
  addAnimalForm: FormGroup;
  user: Utilisateurs = JSON.parse(localStorage.getItem('user') || '{}');
  animaux: Animaux[] = [];
  services: Services[] = [];
  showAddAnimalPopup = false;

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

    this.addAnimalForm = this.fb.group({
      nom: ['', Validators.required],
      race: [''],
      age: [null],
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

  openAddAnimalPopup(): void {
    this.showAddAnimalPopup = true;
  }

  closeAddAnimalPopup(): void {
    this.showAddAnimalPopup = false;
  }

  onAddAnimal(): void {
    if (this.addAnimalForm.valid) {
      const newAnimal: Animaux = {
        id: 0, 
        proprietaireId: this.user.id,
        nom: this.addAnimalForm.value.nom,
        race: this.addAnimalForm.value.race,
        age: this.addAnimalForm.value.age,
        historiqueMedical: null,
        creeLe: new Date()
      };

      this.animauxService.createAnimaux(newAnimal).subscribe({
        next: (createdAnimal: Animaux) => {
          this.animaux.push(createdAnimal);
          this.toaster.success('Animal added successfully');
          this.closeAddAnimalPopup();
        },
        error: (error: any) => {
          console.error('Error adding animal', error);
          this.toaster.error('Error adding animal');
        }
      });
    }
  }

  onSubmit(): void {
    if (this.rendezvousForm.valid) {
      const formValue = this.rendezvousForm.value;
      const selectedService = this.services.find(service => service.id == formValue.motif);
      if (!selectedService) {
        this.toaster.error('Service not found');
        return;
      }

      const rendezVous: RendezVous = {
        id: 0, 
        animalId: formValue.animalId,
        veterinaireId: null, 
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