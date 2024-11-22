import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellVeterinaireComponent } from './shell-veterinaire/shell-veterinaire.component';
import { RendezVousVeterinaireComponent } from './rendez-vous-veterinaire/rendez-vous-veterinaire.component';
import { ListAnimauxVetComponent } from './list-animaux-vet/list-animaux-vet.component';
import { AjoutAnimalComponent } from './ajout-animal/ajout-animal.component';

const routes: Routes = [
  {
    path: '', component: ShellVeterinaireComponent, children: [
      { path: 'rendez-vous', component: RendezVousVeterinaireComponent },
      { path: 'ListAnimauxVet', component: ListAnimauxVetComponent },
      { path: 'ajoutAnimal', component: AjoutAnimalComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VeterinaireRoutingModule { }
