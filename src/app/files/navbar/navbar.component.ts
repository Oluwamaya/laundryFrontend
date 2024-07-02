import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendarDay, faCoffee, faLocation, faLocationCrosshairs, faLocationDot, faMailBulk, faMailForward, faPhone, faPhoneVolume,  } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faLinkedin, faSquareTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons'


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule , FontAwesomeModule ,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  faCoffee = faCoffee;
  faCalender = faCalendarDay
  faLocation = faLocationDot
  faWhatsapp = faWhatsapp
  FALinkden = faLinkedin
  faInstagram = faInstagram
  faFacebook = faFacebook
  faTwitter = faSquareTwitter
  faMail = faMailBulk
  // faPhone = faPhone 
  faPhone = faPhoneVolume 
  isMobileMenuOpen = false;
}
