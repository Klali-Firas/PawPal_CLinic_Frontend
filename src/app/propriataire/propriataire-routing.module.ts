import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellpropriataireComponent } from './shellpropriataire/shellpropriataire.component';
import { RendezvousComponent } from './rendezvous/rendezvous.component';
import { HistoriqueAniComponent } from './historique-ani/historique-ani.component';
import { ShopComponent } from '../shop/shop.component';
import { CartComponent } from '../shop/cart/cart.component';
import { MesCommandesComponent } from './mes-commandes/mes-commandes.component';

const routes: Routes = [
  {
    path: "", component: ShellpropriataireComponent, children: [
      { path: "", redirectTo: "shop", pathMatch: "full" },
      { path: "rendezvous", component: RendezvousComponent },
      { path: "historique", component: HistoriqueAniComponent },
      { path: "shop", component: ShopComponent },
      { path: "shop/cart", component: CartComponent },
      { path: "mes-commandes", component: MesCommandesComponent }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropriataireRoutingModule { }
