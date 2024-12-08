import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Animaux, RendezVous, Utilisateurs } from 'src/app/interfaces/interfaces';
import { AnimauxService } from 'src/app/services/animaux.service';
import { RendezvousService } from 'src/app/services/rendezvous.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-historique-ani',
  templateUrl: './historique-ani.component.html',
  styleUrls: ['./historique-ani.component.css']
})
export class HistoriqueAniComponent implements OnInit {

  user: Utilisateurs = JSON.parse(localStorage.getItem('user') || '{}');
  animaux: Animaux[] = [];
  uniqueAnimaux: Animaux[] = [];
  filteredAnimaux: Animaux[] = [];
  allRendezVous: RendezVous[] = [];
  veterinaires: Map<number, Utilisateurs> = new Map();
  selectedAnimal?: Animaux;
  paginatedAnimaux: Animaux[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;
  totalPagesArray: number[] = [];
  searchTerm: string = '';

  constructor(
    private animauxService: AnimauxService,
    private rendezvousService: RendezvousService,
    private utilisateurService: UtilisateurService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getAnimaux();
    await this.getAllRendezVous();
    await this.getAllVeterinaires();
    this.filterUniqueAnimaux();
    this.updatePagination();
  }

  async getAnimaux(): Promise<void> {
    try {
      this.animaux = await firstValueFrom(this.animauxService.getAnimauxByProprietaireId(this.user.id));
    } catch (error) {
      console.error('Error getting animaux', error);
    }
  }

  async getAllRendezVous(): Promise<void> {
    try {
      this.allRendezVous = await firstValueFrom(this.rendezvousService.getAllRendezVous());
    } catch (error) {
      console.error('Error getting rendez-vous', error);
    }
  }

  async getAllVeterinaires(): Promise<void> {
    try {
      const veterinaires = await firstValueFrom(this.utilisateurService.getAllVeterinaires());
      veterinaires.forEach(vet => this.veterinaires.set(vet.id, vet));
    } catch (error) {
      console.error('Error getting veterinaires', error);
    }
  }

  filterUniqueAnimaux(): void {
    const seen = new Set<number>();
    this.uniqueAnimaux = this.animaux.filter(animal => {
      if (seen.has(animal.id)) {
        return false;
      } else {
        seen.add(animal.id);
        return true;
      }
    });
    this.filteredAnimaux = this.uniqueAnimaux;
  }

  getRendezVousForAnimal(animalId: number): RendezVous[] {
    return this.allRendezVous.filter(r => r.animalId === animalId);
  }

  selectAnimal(animal: Animaux): void {
    this.selectedAnimal = animal;
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredAnimaux.length / this.itemsPerPage);
    this.totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
    this.paginate();
  }

  paginate() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedAnimaux = this.filteredAnimaux.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.paginate();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginate();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginate();
    }
  }

  searchAnimals() {
    this.filteredAnimaux = this.uniqueAnimaux.filter(animal => animal.nom.toLowerCase().includes(this.searchTerm.toLowerCase()));
    this.currentPage = 1;
    this.updatePagination();
  }
}