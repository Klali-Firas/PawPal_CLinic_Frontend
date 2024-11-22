import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Animaux, RendezVous, Services, Utilisateurs } from 'src/app/interfaces/interfaces';
import { AnimauxService } from 'src/app/services/animaux.service';
import { RendezvousService } from 'src/app/services/rendezvous.service';
import { ServiceService } from 'src/app/services/service.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-rendez-vous-veterinaire',
  templateUrl: './rendez-vous-veterinaire.component.html',
  styleUrls: ['./rendez-vous-veterinaire.component.css']
})
export class RendezVousVeterinaireComponent implements OnInit {

  user: Utilisateurs = JSON.parse(localStorage.getItem('user') || '{}');
  rendezVous: RendezVous[] = [];
  page: number = 1;
  animaux: Map<number, Animaux> = new Map();
  proprietaires: Map<number, Utilisateurs> = new Map();
  services: Map<number, Services> = new Map();
  editAnimalForm: FormGroup;
  selectedRendezVous: RendezVous | null = null;

  constructor(
    private fb: FormBuilder,
    private rendezVousService: RendezvousService,
    private animauxService: AnimauxService,
    private userService: UtilisateurService,
    private serviceService: ServiceService,
    private toastr: ToastrService
  ) {
    this.editAnimalForm = this.fb.group({
      nom: ['', Validators.required],
      race: ['', Validators.required],
      remarques: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getRendezVousByVeterinaireId();
    this.getAllServices();
  }

  getRendezVousByVeterinaireId() {
    this.rendezVousService.getRendezVousByVeterinaireId(this.user.id).subscribe(rendezVous => {
      this.rendezVous = rendezVous;
      rendezVous.forEach(rendezVous => {
        this.getAnimalById(rendezVous.animalId);
      });
    });
  }

  getAnimalById(id: number) {
    if (!this.animaux.has(id)) {
      this.animauxService.getAnimauxById(id).subscribe(animal => {
        this.animaux.set(id, animal);
        this.animaux.forEach((animal, key) => {
          this.userService.getProprietaireByAnimalId(animal.id).subscribe(proprietaire => {
            this.proprietaires.set(key, proprietaire);
          });
        });
      });
    }
  }

  getAllServices() {
    this.serviceService.getAllServices().subscribe(services => {
      services.forEach(service => {
        this.services.set(service.id, service);
      });
    });
  }

  openModal(rendezVous: RendezVous) {
    this.selectedRendezVous = rendezVous;
    const animal = this.animaux.get(rendezVous.animalId);
    if (animal) {
      this.editAnimalForm.patchValue({
        nom: animal.nom,
        race: animal.race,
        remarques: rendezVous.remarques || ''
      });
    }
    $('#editAnimalModal').modal('show');
  }

  onSubmit() {
    if (this.editAnimalForm.valid && this.selectedRendezVous) {
      const formValue = this.editAnimalForm.value;
      const updatedAnimal: Animaux = {
        ...this.animaux.get(this.selectedRendezVous.animalId)!,
        nom: formValue.nom,
        race: formValue.race
      };

      this.animauxService.updateAnimaux(updatedAnimal.id, updatedAnimal).subscribe({
        next: () => {
          this.animaux.set(updatedAnimal.id, updatedAnimal);
          const updatedRendezVous: RendezVous = {
            ...this.selectedRendezVous!,
            statut: 'termine',
            remarques: formValue.remarques
          };

          this.rendezVousService.updateRendezVous(updatedRendezVous.id, updatedRendezVous).subscribe({
            next: () => {
              this.rendezVous = this.rendezVous.map(rv => rv.id === updatedRendezVous.id ? updatedRendezVous : rv);
              $('#editAnimalModal').modal('hide');
              this.toastr.success('Rendez-vous mis à jour avec succès', 'Succès');
            },
            error: (error: any) => {
              console.error('Erreur lors de la mise à jour du rendez-vous', error);
              this.toastr.error('Erreur lors de la mise à jour du rendez-vous', 'Erreur');
            }
          });
        },
        error: (error: any) => {
          console.error('Erreur lors de la mise à jour de l\'animal', error);
          this.toastr.error('Erreur lors de la mise à jour de l\'animal', 'Erreur');
        }
      });
    }
  }
}