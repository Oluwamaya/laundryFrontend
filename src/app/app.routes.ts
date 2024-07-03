import { Routes } from '@angular/router';
import { NavbarComponent } from './files/navbar/navbar.component';
import { HomeComponent } from './files/home/home.component';
import { FooterComponent } from './files/footer/footer.component';
import { PricesComponent } from './files/prices/prices.component';
import { AboutComponent } from './files/about/about.component';
import { ServicesComponent } from './files/services/services.component';
import { FaqComponent } from './files/faq/faq.component';
import { ContactComponent } from './files/contact/contact.component';
import { SignupComponent } from './files/signup/signup.component';
import { MainLayoutComponent } from './files/main-layout/main-layout.component';
import { NodisplayLayoutComponent } from './files/nodisplay-layout/nodisplay-layout.component';
import { DashboardComponent } from './files/dashboard/dashboard.component';
import { LoginComponent } from './files/login/login.component';
import { OrderRequestComponent } from './files/order-request/order-request.component';
import { PaymentComponent } from './files/payment/payment.component';
import { InvoiceComponent } from './files/invoice/invoice.component';

export const routes: Routes = [
    {
        path: '', component: MainLayoutComponent, children: [

            {path: "",pathMatch:"full", redirectTo:"/Home"},
            {path: "navbar", component:NavbarComponent} ,
            {path: "Home" , component: HomeComponent},
            {path : "footer" , component:FooterComponent},
            {path : "Prices", component: PricesComponent},
            {path : "AboutUs", component: AboutComponent},
            {path: "Services", component: ServicesComponent},
            {path: "FAQ", component: FaqComponent},
            {path: "Contact", component: ContactComponent},
            {path: "Dashboard", component: DashboardComponent}
          
        ] ,  
    },
    {
        path: '',
        component: NodisplayLayoutComponent,
        children: [
            {path: "Signup", component: SignupComponent},
            {path: "login", component:LoginComponent},
            {path:"order", component: OrderRequestComponent },
            {path: "payment", component: PaymentComponent},
            {path: "invoice" , component: InvoiceComponent}
            
        ]
    }
];
 


// export const AppRoutingModule = RouterModule.forRoot(routes);