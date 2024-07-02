import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule, RouterOutlet, NavbarComponent ,FooterComponent],
  templateUrl: './main-layout.component.html',
  template: `
  <app-navbar></app-navbar>
  <router-outlet></router-outlet>
  <app-footer></app-footer>
  `,
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent { }
