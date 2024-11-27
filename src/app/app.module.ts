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




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000, // Duration of the toast
      positionClass: 'toast-bottom-right', // Position of the toast
      preventDuplicates: true, // Prevent duplicate toasts
      progressBar: true, // Show progress bar
      closeButton: true, // Show close button
      tapToDismiss: true, // Dismiss on tap
    }),
    NgxSpinnerModule.forRoot({
      type: 'ball-scale-multiple',
    }),

    FormsModule,

  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
