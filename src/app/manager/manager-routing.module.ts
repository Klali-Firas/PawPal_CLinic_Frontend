import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellManagerComponent } from './shell-manager/shell-manager.component';
import { AppointmentsManagerComponent } from './appointments-manager/appointments-manager.component';
import { ProduitsComponent } from './produits/produits.component';
import { CommandesComponent } from './commandes/commandes.component';
import { DashboardManagerComponent } from './dashboard-manager/dashboard-manager.component';

const routes: Routes = [
  {
    path: '', component: ShellManagerComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'rendezvous', component: AppointmentsManagerComponent },
      { path: 'produits', component: ProduitsComponent },
      { path: 'commandes', component: CommandesComponent },
      { path: 'dashboard', component: DashboardManagerComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
