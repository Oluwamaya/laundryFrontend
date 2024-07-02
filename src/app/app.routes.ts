import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './files/navbar/navbar.component';
import { HomeComponent } from './files/home/home.component';
import { FooterComponent } from './files/footer/footer.component';
import { PricesComponent } from './files/prices/prices.component';
import { AboutComponent } from './files/about/about.component';
import { ServicesComponent } from './files/services/services.component';
import { FaqComponent } from './files/faq/faq.component';
import { ContactComponent } from './files/contact/contact.component';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { SignupComponent } from './files/signup/signup.component';

export const routes: Routes = [
    {path: "",pathMatch:"full", redirectTo:"Home"},
   {path: "navbar", component:NavbarComponent} ,
   {path: "Home" , component: HomeComponent},
   {path : "footer" , component:FooterComponent},
   {path : "Prices", component: PricesComponent},
   {path : "AboutUs", component: AboutComponent},
   {path: "Services", component: ServicesComponent},
   {path: "FAQ", component: FaqComponent},
   {path: "Contact", component: ContactComponent},
   {path: "Signup" , component: SignupComponent},
   


];

// export const AppRoutingModule = RouterModule.forRoot(routes);