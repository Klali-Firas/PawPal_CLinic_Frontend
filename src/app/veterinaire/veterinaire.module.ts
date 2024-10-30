import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VeterinaireRoutingModule } from './veterinaire-routing.module';
import { ShellComponent } from './shell/shell.component';


@NgModule({
  declarations: [
    ShellComponent
  ],
  imports: [
    CommonModule,
    VeterinaireRoutingModule
  ]
})
export class VeterinaireModule { }
