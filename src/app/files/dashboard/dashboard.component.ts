import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faNairaSign } from '@fortawesome/free-solid-svg-icons';

interface UserInfo {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  address: string | null;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, FontAwesomeModule , RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  
  public userInfo: UserInfo | null = null; 
  public token: string | null = localStorage.getItem('lUserToken');
  public greeting : any = ''

  constructor(private http: HttpClient, private router: Router) {}



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


  ngOnInit() {
    console.log(this.token);
    this.getUserInfo();
    this.setGreeting()
  }
  setGreeting() {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      this.greeting = 'Good Morning';
    } else if (currentHour < 18) {
      this.greeting = 'Good Afternoon';
    } else {
      this.greeting = 'Good Evening';
    }
  }
  getUserInfo() {
    if (!this.token) {
      console.error("Token is missing.");
      alert("Token expired, please log in again to continue.");
      this.router.navigate(["/patient-login"]);
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    this.http.post<any>("http://localhost/laundryBackend/Dashboard/dashboard.php", {}, { headers }).subscribe(
      (response) => {
        if (response.status) {
          console.log("User information:", response);
          this.userInfo = response.user;
          console.log(this.userInfo);
          
          localStorage.setItem("allInfo", JSON.stringify(this.userInfo));
        } else {
          console.error("Failed to fetch user information:", response.message);
          alert("Token expired, please log in again to continue.");
          this.router.navigate(["/patient-login"]);
        }
      },
      (error) => {
        console.error("Error fetching user information:", error);
        alert("An error occurred while fetching user information.");
      }
    );
  }

  
    
  
 // dashboard.component.ts
choosePlan(planAmount: number, planName: string) {
  this.router.navigate(['/invoice'], { queryParams: { amount: planAmount, plan: planName } });
}

}
