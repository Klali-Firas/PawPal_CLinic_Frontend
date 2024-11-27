import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellpropriataireComponent } from './shellpropriataire/shellpropriataire.component';
import { RendezvousComponent } from './rendezvous/rendezvous.component';
import { HistoriqueAniComponent } from './historique-ani/historique-ani.component';

const routes: Routes = [
  {path: "" , component:ShellpropriataireComponent, children:[
  {path:"rendezvous", component:RendezvousComponent},
  {path:"historique", component:HistoriqueAniComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropriataireRoutingModule { }
