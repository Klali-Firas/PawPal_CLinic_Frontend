import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PropriataireModule } from './propriataire/propriataire.module';

const routes: Routes = [
  { path: '', component: LoginComponent },  // Default login page
  { path: 'home', component: HomeComponent },
  { path: "manager", loadChildren: () => import('./manager/manager.module').then(m => m.ManagerModule) },
  { path: "proprietaire", loadChildren: () => import('./propriataire/propriataire.module').then(m => PropriataireModule) },
  // Home page after login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
