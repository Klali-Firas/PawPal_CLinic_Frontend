import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellManagerComponent } from './shell-manager/shell-manager.component';
import { AppointmentsManagerComponent } from './appointments-manager/appointments-manager.component';
import { DashboardManagerComponent } from './dashboard-manager/dashboard-manager.component';

const routes: Routes = [
  {
    path: '', component: ShellManagerComponent, children: [
      { path: 'rendezvous', component: AppointmentsManagerComponent },
      { path: 'dashboard', component: DashboardManagerComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
