import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccueilRoutingModule } from './accueil-routing.module';
import { ShellAccueilComponent } from './shell-accueil/shell-accueil.component';
import { NavaccueilComponent } from './navaccueil/navaccueil.component';
import { PageAccueilComponent } from './page-accueil/page-accueil.component';


@NgModule({
  declarations: [
    ShellAccueilComponent,
    NavaccueilComponent,
    PageAccueilComponent
  ],
  imports: [
    CommonModule,
    AccueilRoutingModule,
  ]
})
export class AccueilModule { }
