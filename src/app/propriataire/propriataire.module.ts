import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropriataireRoutingModule } from './propriataire-routing.module';
import { RendezvousComponent } from './rendezvous/rendezvous.component';
import { ShellpropriataireComponent } from './shellpropriataire/shellpropriataire.component';
import { NavpropriataireComponent } from './navpropriataire/navpropriataire.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MesRendezVousProprietaireComponent } from './mes-rendez-vous-proprietaire/mes-rendez-vous-proprietaire.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { StarRatingComponent } from '../components/star-rating/star-rating.component';


@NgModule({
  declarations: [
    RendezvousComponent,
    ShellpropriataireComponent,
    NavpropriataireComponent,
    MesRendezVousProprietaireComponent,
    StarRatingComponent
  ],
  imports: [
    CommonModule,
    PropriataireRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ]
})
export class PropriataireModule { }
