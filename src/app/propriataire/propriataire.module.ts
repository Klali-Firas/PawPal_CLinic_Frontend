import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropriataireRoutingModule } from './propriataire-routing.module';
import { RendezvousComponent } from './rendezvous/rendezvous.component';
import { ShellpropriataireComponent } from './shellpropriataire/shellpropriataire.component';
import { NavpropriataireComponent } from './navpropriataire/navpropriataire.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RendezvousComponent,
    ShellpropriataireComponent,
    NavpropriataireComponent
  ],
  imports: [
    CommonModule,
    PropriataireRoutingModule,
    ReactiveFormsModule
  ]
})
export class PropriataireModule { }
