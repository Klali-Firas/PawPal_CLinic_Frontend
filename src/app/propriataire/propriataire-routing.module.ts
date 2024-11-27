import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellpropriataireComponent } from './shellpropriataire/shellpropriataire.component';
import { RendezvousComponent } from './rendezvous/rendezvous.component';
import { MesRendezVousProprietaireComponent } from './mes-rendez-vous-proprietaire/mes-rendez-vous-proprietaire.component';

const routes: Routes = [
  {
    path: "", component: ShellpropriataireComponent, children: [
      { path: "rendezvous", component: RendezvousComponent },
      { path: "mes-rendez-vous", component: MesRendezVousProprietaireComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropriataireRoutingModule { }
