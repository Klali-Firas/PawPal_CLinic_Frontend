import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellManagerComponent } from './shell-manager/shell-manager.component';
import { AppointmentsManagerComponent } from './appointments-manager/appointments-manager.component';

const routes: Routes = [
  {
    path: '', component: ShellManagerComponent, children: [
      { path: 'rendezvous', component: AppointmentsManagerComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
