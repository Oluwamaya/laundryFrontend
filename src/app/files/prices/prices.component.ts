import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAward, faCartShopping, faCheck, faFaceSmileBeam, faHandSparkles, faLeaf, faLightbulb, faNairaSign, faPercent, faRocket, faSmileBeam, faTimesCircle, faTruck, faUser } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-prices',
  standalone: true,
  imports: [CommonModule , FontAwesomeModule ],
  templateUrl: './prices.component.html',
  styleUrl: './prices.component.css'
})
export class PricesComponent {
  public  activeButton: string = 'student';

  faNaira = faNairaSign
  faCorrect = faCheck
  
  toggleContent(button: string) {
    this.activeButton = button;
  }

  activeIndex: number | null = null;
    toggle(index: number): void {
      this.activeIndex = this.activeIndex === index ? null : index;
    }
  
  
}
