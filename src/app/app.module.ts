import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { RouterModule } from '@angular/router'; // <-- Rutas

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';
import { DashboardComponent } from './dashboard.component';
import { HeroSearchComponent } from './hero-search.component';
import { HeroService } from './hero.service';

import { AppRoutingModule } from './app-routing.module'; // <-- Módulo que contiene las rutas
import { HttpModule } from '@angular/http'; // To allow access to these services from anywhere in the app,

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api'; // replacing the Http client's XHR backend service with an in-memory alternative.
import { InMemoryDataService }  from './in-memory-data.service'; 

@NgModule({
  imports: [BrowserModule,
    HttpModule, // To allow access to these services from anywhere in the app,
    InMemoryWebApiModule.forRoot(InMemoryDataService), // Import the InMemoryWebApiModule after the HttpModule to ensure that the XHRBackend provider of the InMemoryWebApiModule supersedes all others.
    FormsModule, // <-- import the FormsModule before binding with [(ngModel)]
    AppRoutingModule], // <-- import the routes
  declarations: [AppComponent,
    HeroDetailComponent,
    HeroesComponent,
    DashboardComponent,
    HeroSearchComponent],
  providers: [
    HeroService // <-- singleton HeroService instance, available to all components of the app
  ],
  bootstrap: [AppComponent]

})

export class AppModule { }
