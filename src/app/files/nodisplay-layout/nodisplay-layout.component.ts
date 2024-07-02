import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nodisplay-layout',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './nodisplay-layout.component.html',
  styleUrl: './nodisplay-layout.component.css',
  template: `
  <router-outlet></router-outlet>
`,
})
export class NodisplayLayoutComponent {

}
