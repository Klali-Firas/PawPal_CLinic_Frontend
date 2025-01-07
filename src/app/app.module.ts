import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShopComponent } from './shop/shop.component';
import { ProductListComponent } from './shop/product-list/product-list.component';
import { ProductDetailComponent } from './shop/produit-detail/produit-detail.component'; import { CommonModule } from '@angular/common';
import { CartComponent } from './shop/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ShopComponent,
    ProductListComponent,
    ProductDetailComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, // Ensure FormsModule is imported here
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,

    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000, // Duration of the toast
      positionClass: 'toast-bottom-right', // Position of the toast
      preventDuplicates: false, // Prevent duplicate toasts
      progressBar: true, // Show progress bar
      closeButton: true, // Show close button
      tapToDismiss: true, // Dismiss on tap
    }),
    NgxSpinnerModule.forRoot({
      type: 'ball-scale-multiple',
    })
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }