import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PropriataireModule } from './propriataire/propriataire.module';
import { ShopComponent } from './shop/shop.component';
import { DashBoardVetComponent } from './veterinaire/dash-board-vet/dash-board-vet.component';
import { ListAnimauxVetComponent } from './veterinaire/list-animaux-vet/list-animaux-vet.component';
import { AjoutAnimalComponent } from './veterinaire/ajout-animal/ajout-animal.component';
import { ProduitDetailComponent } from './shop/produit-detail/produit-detail.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./accueil/accueil.module').then(m => m.AccueilModule) }, // Default route
  { path: 'login', component: LoginComponent },  // Default login page
  { path: 'home', component: HomeComponent },
  { path: "manager", loadChildren: () => import('./manager/manager.module').then(m => m.ManagerModule) },
  { path: "proprietaire", loadChildren: () => import('./propriataire/propriataire.module').then(m => PropriataireModule) },

  { path: "shop", component: ShopComponent },
  { path: 'product-detail/:id', component: ProduitDetailComponent},
  { path: 'veterinaire', loadChildren: () => import('./veterinaire/veterinaire.module').then(m => m.VeterinaireModule) },
  // { path: 'ListAnimauxVet', component: ListAnimauxVetComponent},
  // { path: 'ajoutAnimal', component: AjoutAnimalComponent},
       
  // Home page after login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
