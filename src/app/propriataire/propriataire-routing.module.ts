import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellpropriataireComponent } from './shellpropriataire/shellpropriataire.component';
import { RendezvousComponent } from './rendezvous/rendezvous.component';
import { HistoriqueAniComponent } from './historique-ani/historique-ani.component';
import { ShopComponent } from '../shop/shop.component';

const routes: Routes = [
  {path: "" , component:ShellpropriataireComponent, children:[
  {path:"rendezvous", component:RendezvousComponent},
  {path:"historique", component:HistoriqueAniComponent},
  {path:"shop",component:ShopComponent}
  
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropriataireRoutingModule { }
