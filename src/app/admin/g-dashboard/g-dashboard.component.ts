import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-g-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule ,FontAwesomeModule],
  templateUrl: './g-dashboard.component.html',
  styleUrls: ['./g-dashboard.component.css']
})
export class GDashboardComponent {
  public adminInfo: any = null;
  public token: any | null = JSON.parse(localStorage.getItem('lAdminToken')!);
  public childpayment : any = false
   
  faBar = faBars
  
  public greeting : string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    console.log(this.token.value);
    
    this.getUserInfo();
    this.setGreeting();
  }

  setGreeting() {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      this.greeting = 'Good Morning';
    } else if (currentHour < 16) {
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
   const token  = this.token.value
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    console.log(token);
    
    this.http.post<any>("https://laundry.eaaafrica.org/Admin/adashboard.php", {}, { headers }).subscribe(
      (response) => {
        console.log(response);
        
        if (response.status === true) {
         
          console.log("User information:", response);
          this.adminInfo = response.user;
          console.log(this.adminInfo);
          
          localStorage.setItem("adminInfo", JSON.stringify(this.adminInfo));
        } else {
          console.error("Failed to fetch user information:", response.message);
          alert("Token expired, please log in again to continue.");
          this.router.navigate(["/sooAlogin"]);
        }
      },
      (error) => {
        console.error("Error fetching user information:", error);
        alert("An error occurred while fetching user information.");
      }
    );
  }
}
