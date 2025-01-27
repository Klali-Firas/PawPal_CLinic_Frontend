import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VeterinaireRoutingModule } from './veterinaire-routing.module';

import { ShellVeterinaireComponent } from './shell-veterinaire/shell-veterinaire.component';
import { NavVeterinaireComponent } from './nav-veterinaire/nav-veterinaire.component';
import { RendezVousVeterinaireComponent } from './rendez-vous-veterinaire/rendez-vous-veterinaire.component';
import { NgxPaginationModule } from 'ngx-pagination';


import { DashBoardVetComponent } from './dash-board-vet/dash-board-vet.component';
import { ListAnimauxVetComponent } from './list-animaux-vet/list-animaux-vet.component';
import { AjoutAnimalComponent } from './ajout-animal/ajout-animal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppModule } from '../app.module';
import { SahredModule } from '../sahred/sahred.module';



@NgModule({
  declarations: [

    ShellVeterinaireComponent,
    NavVeterinaireComponent,
    RendezVousVeterinaireComponent,
    DashBoardVetComponent,
    ListAnimauxVetComponent,
    AjoutAnimalComponent,

  ],
  imports: [
    SahredModule,
    CommonModule,
    VeterinaireRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class VeterinaireModule { }
