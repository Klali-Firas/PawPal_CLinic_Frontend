import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
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
      proprietaire: [{ value: `${this.user.nom} ${this.user.prenom}`, disabled: true }, Validators.required],
      animalId: [null, Validators.required],
      dateRendezVous: [null, [Validators.required, this.noWeekendsValidator, this.workingHoursValidator]],
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
    this.setMinDateForRendezVous();
  }

  getAnimaux(): void {
    this.animauxService.getAnimauxByProprietaireId(this.user.id).subscribe({
      next: (response: Animaux[]) => this.animaux = response,
      error: (error: any) => console.error('Erreur lors de la récupération des animaux', error)
    });
  }

  getServices(): void {
    this.serviceService.getAllServices().subscribe({
      next: (response: Services[]) => this.services = response,
      error: (error: any) => console.error('Erreur lors de la récupération des services', error)
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
          this.toaster.success('Animal ajouté avec succès');
          this.closeAddAnimalPopup();
        },
        error: (error: any) => {
          console.error('Erreur lors de l\'ajout de l\'animal', error);
          this.toaster.error('Erreur lors de l\'ajout de l\'animal');
        }
      });
    }
  }

  onSubmit(): void {
    if (this.rendezvousForm.valid) {
      const formValue = this.rendezvousForm.value;
      const selectedService = this.services.find(service => service.id == formValue.motif);
      if (!selectedService) {
        this.toaster.error('Service non trouvé');
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
          this.toaster.success('Rendez-vous créé avec succès');
          this.rendezvousForm.reset();
          this.rendezvousForm.patchValue({ proprietaire: `${this.user.nom} ${this.user.prenom}` });
        },
        error: (error: any) => {
          console.error('Erreur lors de la création du rendez-vous', error);
          this.toaster.error('Erreur lors de la création du rendez-vous');
        }
      });
    }
  }

  setMinDateForRendezVous(): void {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 2);
    tomorrow.setHours(0, 0, 0, 0);
    const minDate = tomorrow.toISOString().slice(0, 16);
    const dateInput = document.getElementById('dateRendezVous') as HTMLInputElement;
    dateInput.min = minDate;
  }

  noWeekendsValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const date = new Date(control.value);
    const day = date.getUTCDay();
    if (day === 0 || day === 6) {
      return { 'weekend': true };
    }
    return null;
  }

  workingHoursValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const date = new Date(control.value);
    const day = date.getUTCDay();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    if (day >= 1 && day <= 4) { // Monday to Thursday
      if ((hours < 8 || (hours === 8 && minutes < 0)) || ((hours >= 12 && minutes > 0) && (hours < 14 || (hours === 14 && minutes < 0))) || (hours == 13) || (hours >= 17)) {
        return { 'workingHours': true };
      }
    } else if (day === 5) { // Friday
      if ((hours < 8 || (hours === 8 && minutes < 0)) || (hours >= 14)) {
        return { 'workingHours': true };
      }
    } else {
      return { 'workingHours': true };
    }
    return null;
  }
}