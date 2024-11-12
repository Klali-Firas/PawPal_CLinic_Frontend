import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VeterinaireRoutingModule } from './veterinaire-routing.module';
import { ShellVeterinaireComponent } from './shell-veterinaire/shell-veterinaire.component';
import { NavVeterinaireComponent } from './nav-veterinaire/nav-veterinaire.component';
import { RendezVousVeterinaireComponent } from './rendez-vous-veterinaire/rendez-vous-veterinaire.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    ShellVeterinaireComponent,
    NavVeterinaireComponent,
    RendezVousVeterinaireComponent
  ],
  imports: [
    CommonModule,
    VeterinaireRoutingModule,
    NgxPaginationModule
  ]
})
export class VeterinaireModule { }
