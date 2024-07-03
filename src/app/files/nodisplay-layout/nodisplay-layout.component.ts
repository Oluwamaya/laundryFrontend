import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-nodisplay-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './nodisplay-layout.component.html',
  styleUrl: './nodisplay-layout.component.css',
})
export class NodisplayLayoutComponent {

}
