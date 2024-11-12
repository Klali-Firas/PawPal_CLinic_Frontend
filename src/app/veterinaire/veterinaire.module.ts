import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VeterinaireRoutingModule } from './veterinaire-routing.module';

import { NavVeterinaireComponent } from './nav-veterinaire/nav-veterinaire.component';
import { DashBoardVetComponent } from './dash-board-vet/dash-board-vet.component';
import { ListAnimauxVetComponent } from './list-animaux-vet/list-animaux-vet.component';
import { AjoutAnimalComponent } from './ajout-animal/ajout-animal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    
    NavVeterinaireComponent,
    DashBoardVetComponent,
    ListAnimauxVetComponent,
    AjoutAnimalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    VeterinaireRoutingModule,
    ReactiveFormsModule,
  ]
})
export class VeterinaireModule { }
