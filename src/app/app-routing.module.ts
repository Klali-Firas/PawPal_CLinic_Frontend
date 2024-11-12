import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PropriataireModule } from './propriataire/propriataire.module';

const routes: Routes = [
  { path: '', loadChildren: () => import('./accueil/accueil.module').then(m => m.AccueilModule) }, // Default route
  { path: 'login', component: LoginComponent },  // Default login page
  { path: 'home', component: HomeComponent },
  { path: "manager", loadChildren: () => import('./manager/manager.module').then(m => m.ManagerModule) },
  { path: "proprietaire", loadChildren: () => import('./propriataire/propriataire.module').then(m => PropriataireModule) },
  { path: 'veterinaire', loadChildren: () => import('./veterinaire/veterinaire.module').then(m => m.VeterinaireModule) },
  // Home page after login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
