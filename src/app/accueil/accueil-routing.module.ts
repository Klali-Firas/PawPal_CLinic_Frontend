import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellAccueilComponent } from './shell-accueil/shell-accueil.component';
import { PageAccueilComponent } from './page-accueil/page-accueil.component';
import { ShopComponent } from '../shop/shop.component';
import { CartComponent } from '../shop/cart/cart.component';

const routes: Routes = [
  {
    path: '', component: ShellAccueilComponent, children: [
      { path: '', component: PageAccueilComponent },
      { path: 'shop', component: ShopComponent },
      { path: 'shop/cart', component: CartComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccueilRoutingModule { }
