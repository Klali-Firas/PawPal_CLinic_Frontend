import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropriataireRoutingModule } from './propriataire-routing.module';
import { RendezvousComponent } from './rendezvous/rendezvous.component';
import { ShellpropriataireComponent } from './shellpropriataire/shellpropriataire.component';
import { NavpropriataireComponent } from './navpropriataire/navpropriataire.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HistoriqueAniComponent } from './historique-ani/historique-ani.component';
import { FormsModule } from '@angular/forms';
import { MesCommandesComponent } from './mes-commandes/mes-commandes.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    RendezvousComponent,
    ShellpropriataireComponent,
    NavpropriataireComponent,
    HistoriqueAniComponent,
    MesCommandesComponent
  ],
  imports: [
    CommonModule,
    PropriataireRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ],
  exports: [
    HistoriqueAniComponent
  ]
})
export class PropriataireModule { }
