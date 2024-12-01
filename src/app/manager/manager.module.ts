import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ShellManagerComponent } from './shell-manager/shell-manager.component';
import { NavManagerComponent } from './nav-manager/nav-manager.component';
import { AppointmentsManagerComponent } from './appointments-manager/appointments-manager.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ProduitsComponent } from './produits/produits.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommandesComponent } from './commandes/commandes.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [

    ShellManagerComponent,
    NavManagerComponent,
    AppointmentsManagerComponent,
    ProduitsComponent,
    CommandesComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class ManagerModule { }
