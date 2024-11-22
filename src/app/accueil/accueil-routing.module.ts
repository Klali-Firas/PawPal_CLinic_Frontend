import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellAccueilComponent } from './shell-accueil/shell-accueil.component';
import { PageAccueilComponent } from './page-accueil/page-accueil.component';

const routes: Routes = [
  {
    path: '', component: ShellAccueilComponent, children: [
      { path: '', component: PageAccueilComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccueilRoutingModule { }
