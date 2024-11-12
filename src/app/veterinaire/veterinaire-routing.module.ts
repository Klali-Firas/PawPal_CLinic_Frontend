import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellVeterinaireComponent } from './shell-veterinaire/shell-veterinaire.component';
import { RendezVousVeterinaireComponent } from './rendez-vous-veterinaire/rendez-vous-veterinaire.component';

const routes: Routes = [
  {
    path: '', component: ShellVeterinaireComponent, children: [
      { path: 'rendez-vous', component: RendezVousVeterinaireComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VeterinaireRoutingModule { }
