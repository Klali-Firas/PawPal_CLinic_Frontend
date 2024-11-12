import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ShellManagerComponent } from './shell-manager/shell-manager.component';
import { NavManagerComponent } from './nav-manager/nav-manager.component';
import { AppointmentsManagerComponent } from './appointments-manager/appointments-manager.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [

    ShellManagerComponent,
    NavManagerComponent,
    AppointmentsManagerComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    NgxSpinnerModule
  ]
})
export class ManagerModule { }
