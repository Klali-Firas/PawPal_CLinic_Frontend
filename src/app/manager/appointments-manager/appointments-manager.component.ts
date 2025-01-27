import { Component, Inject, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { Animaux, RendezVous, Services, Utilisateurs } from 'src/app/interfaces/interfaces';
import { AnimauxService } from 'src/app/services/animaux.service';
import { RendezvousService } from 'src/app/services/rendezvous.service';
import { ServiceService } from 'src/app/services/service.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-appointments-manager',
  templateUrl: './appointments-manager.component.html',
  styleUrls: ['./appointments-manager.component.css']
})
export class AppointmentsManagerComponent implements OnInit {


  constructor(private rendezVousService: RendezvousService, private utilisateurService: UtilisateurService, private ngxSpinner: NgxSpinnerService, private toaster: ToastrService, private animauxService: AnimauxService, private serviceService: ServiceService) { }


  rendezVous?: RendezVous[];
  veterinaires: Map<number, Utilisateurs> = new Map();
  proprietaires: Map<number, Utilisateurs> = new Map();
  animaux: Map<number, Animaux> = new Map();
  // Component code
  selectedVetIds: { [rendezVousId: number]: number } = {};

  services: Map<number, Services> = new Map();

  currentPage: number = 1;
  itemsPerPage: number = 7;

  async ngOnInit(): Promise<void> {
    this.getAllServices();
    await this.getAllVeterinaires();
    await this.getAllRendezVous();
    this.sortRendezVousByDate();
    this.rendezVous?.forEach(async rendezVous => {
      await this.getPrioprietaireByAnimalId(rendezVous.animalId);
      this.getAnimauxById(rendezVous.animalId);
      // if (rendezVous.veterinaireId === null) return;
      // await this.getVeterinaireById(rendezVous.veterinaireId);
    });

  }

  sortRendezVousByDate() {
    this.rendezVous?.sort((a, b) => new Date(b.creeLe!).getTime() - new Date(a.creeLe!).getTime());
  }

  get paginatedRendezVous() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.rendezVous?.slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage * this.itemsPerPage < (this.rendezVous?.length || 0)) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  async getAllRendezVous() {
    try {
      this.rendezVous = await firstValueFrom(this.rendezVousService.getAllRendezVous());
      console.log(this.rendezVous);
    }
    catch (err) {
      console.error(err);
    }
  }

  async getVeterinaireById(id: number) {
    try {
      const veterinaire = await firstValueFrom(this.utilisateurService.getVeterinaireById(id));
      this.veterinaires.set(id, veterinaire!);
    }
    catch (err) {
      console.error(err);
    }
  }

  async getPrioprietaireByAnimalId(animalId: number) {
    try {
      const proprietaire = await firstValueFrom(this.utilisateurService.getProprietaireByAnimalId(animalId));
      this.proprietaires.set(animalId, proprietaire!);
    }
    catch (err) {
      console.error(err);
    }
  }

  async getAllVeterinaires() {
    try {
      const allVeterinaires = await firstValueFrom(this.utilisateurService.getAllVeterinaires());
      allVeterinaires.map(veterinaire => {
        this.veterinaires.set(veterinaire.id, veterinaire);
      });
    }
    catch (err) {
      console.error(err);
    }
  }

  assignVeterinaire(rendezVousId: number, veterinaireId: number) {
    if (!veterinaireId) return; // Ensure a vet is selected
    this.ngxSpinner.show();
    this.rendezVousService.assignVeterinaire(rendezVousId, veterinaireId).subscribe({
      next: async (rendezVous) => {
        console.log(rendezVous);
        this.rendezVous?.forEach(rendezVous => {
          if (rendezVous.id === rendezVousId) {
            rendezVous.veterinaireId = veterinaireId;
          }
        });
        await this.getAllRendezVous();
        this.rendezVous?.forEach(async rendezVous => {
          await this.getPrioprietaireByAnimalId(rendezVous.animalId);
          // if (rendezVous.veterinaireId === null) return;
          // await this.getVeterinaireById(rendezVous.veterinaireId);
        });
        this.ngxSpinner.hide();
        this.toaster.success('Veterinaire assigné avec succès');
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  onVetChange(event: Event, rendezVousId: number) {
    const selectElement = event.target as HTMLSelectElement; // Type the event target
    this.selectedVetIds[rendezVousId] = +selectElement.value; // Get the value
  }

  getAnimauxById(id: number) {
    this.animauxService.getAnimauxById(id).subscribe({
      next: (animal) => {
        this.animaux.set(id, animal);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  getAllServices() {
    this.serviceService.getAllServices().subscribe({
      next: (services) => {
        services.map(service => {
          this.services.set(service.id, service);
        });
      },
      error: (err) => {
        console.error(err);
      }
    });
  }


}
