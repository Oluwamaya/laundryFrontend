import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAward, faCartShopping, faFaceSmileBeam, faHandSparkles, faLeaf, faLightbulb, faPercent, faRocket, faSmileBeam, faTimesCircle, faTruck, faUser } from '@fortawesome/free-solid-svg-icons';
// import { faUser } from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FontAwesomeModule ,CommonModule, RouterModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public  activeButton: string = 'questions';

  public images1: any [] = [
    'assets/img07.jpg',
    'assets/img08.jpg',
    'assets/img11.jpg',
    'assets/lady2.jpg',
    'assets/lady.jpg'
  ];
  
  public images2: any [] = [
    'assets/smile.webp',
    'assets/black.webp',
    'assets/people.webp',
    'assets/ladydriving.webp',
    'assets/bobo.webp'
  ];
  
  public currentIndex1: number = 0;
  public currentIndex2: number = 0;
  
  ngOnInit() {
    this.setInitialBackgrounds();
    this.changeBackgrounds();
  }
  
  setInitialBackgrounds() {
    const container1 = document.querySelector('.image-container') as HTMLElement;
    const container2 = document.querySelector('.image-container2') as HTMLElement;
    const heading1 = document.querySelector('.slide-in') as HTMLElement;
    const heading2 = document.querySelector('.slide-in2') as HTMLElement;
  
    if (container1 && heading1) {
      container1.style.backgroundImage = `url(${this.images1[this.currentIndex1]})`;
      heading1.classList.add('active');
    }
  
    if (container2 && heading2) {
      container2.style.backgroundImage = `url(${this.images2[this.currentIndex2]})`;
      heading2.classList.add('active');
    }
  }
  
  changeBackgrounds() {
    setInterval(() => {
      const container1 = document.querySelector('.image-container') as HTMLElement;
      const container2 = document.querySelector('.image-container2') as HTMLElement;
      const heading1 = document.querySelector('.slide-in') as HTMLElement;
      const heading2 = document.querySelector('.slide-in2') as HTMLElement;
  
      if (container1 && heading1) {
        this.currentIndex1 = (this.currentIndex1 + 1) % this.images1.length;
        container1.style.backgroundImage = `url(${this.images1[this.currentIndex1]})`;
  
        heading1.classList.remove('active');
        setTimeout(() => heading1.classList.add('active'), 100);
      }
  
      if (container2 && heading2) {
        this.currentIndex2 = (this.currentIndex2 + 1) % this.images2.length;
        container2.style.backgroundImage = `url(${this.images2[this.currentIndex2]})`;
  
        heading2.classList.remove('active');
        setTimeout(() => heading2.classList.add('active'), 100);
      }
    }, 5000);
  }
   
  faLeaf = faLeaf
  faTime = faTimesCircle
  faCart = faCartShopping
  faHand = faHandSparkles
  faAward = faAward
  faSmiley = faFaceSmileBeam
  faBulb = faLightbulb
  faPercent = faPercent
  faRocket = faRocket
  faUser =  faUser
  faTruck = faTruck
  
  
  toggleContent(button: string) {
    this.activeButton = button;
  }
  
 public items : any [] = [
  { title: 'What if my clothes are heavily stained?', content: 'We try our best to remove the stains by adapting the best washing cycle, detergent, temperature suitable for the garment, however in case of tough stains, we would recommend you to use our stain removal or dry cleaning service.' },
  { title: 'How long you take to return the garment', content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam deleniti molestiae doloribus ipsa corrupti? Fugiat eius voluptates tempora quisquam ea amet necessitatibus. Ducimus ab veniam iure aliquid error, eum repellendus?' },
  { title: 'How can i pay for the services?', content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam deleniti molestiae doloribus ipsa corrupti? Fugiat eius voluptates tempora quisquam ea amet necessitatibus. Ducimus ab veniam iure aliquid error, eum repellendus?' },
  { title: 'Does dry cleaning process removes all the stains', content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam deleniti molestiae doloribus ipsa corrupti? Fugiat eius voluptates tempora quisquam ea amet necessitatibus. Ducimus ab veniam iure aliquid error, eum repellendus?' },
];

activeIndex: number | null = null;

toggle(index: number): void {
  this.activeIndex = this.activeIndex === index ? null : index;
}
}
