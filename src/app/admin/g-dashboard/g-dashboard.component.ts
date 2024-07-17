import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-g-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, FontAwesomeModule],
  templateUrl: './g-dashboard.component.html',
  styleUrls: ['./g-dashboard.component.css']
})
export class GDashboardComponent implements OnInit {
  public adminInfo: any = null;
  public token: any | null = null;
  public childpayment: boolean[] = [false, false, false, false, false, false];
  public allUserInfo: any[] = [];
  faBar = faBars;
  public greeting: string = '';
  public paymentInfo  : any [] = []
  totalPayments: number = 0;
  totalAccepted: number = 0;
  totalRejected: number = 0;
  totalPending: number = 0;
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.token = this.getToken();
    if (!this.token) {
      alert("Token expired, please log in again to continue.");
      this.router.navigate(["/sooAlogin"]);
      return;
    }
    this.getUserInfo();
    this.setGreeting();
    this.getAllUserInfo();
  }

  toggleChildPayment(index: number): void {
    this.childpayment = this.childpayment.map((_, i) => i === index);
  }

  hideChildPayment(): void {
    this.childpayment = this.childpayment.map(() => false);
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

  getToken(): any | null {
    const tokenData = JSON.parse(localStorage.getItem('lAdminToken')!);
    if (!tokenData || Date.now() > tokenData.expiry) {
      this.removeToken();
      return null;
    }
    return tokenData.value;
  }

  removeToken() {
    localStorage.removeItem('lAdminToken');
  }

  getUserInfo() {
    if (!this.token) {
      console.error("Token is missing.");
      alert("Token expired, please log in again to continue.");
      this.router.navigate(["/sooAlogin"]);
      return;
    }
    const token = this.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    this.http.post<any>("http://localhost/laundryBackend/Admin/adashboard.php", {}, { headers }).subscribe(
      (response) => {
        console.log(response);
        
        if (response.status === true) {
          this.adminInfo = response.user;
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

  getAllUserInfo() {
    this.http.post<any>("http://localhost/laundryBackend/admin/fetchAllUsers.php", {}).subscribe((res) => {
      console.log(res);
      
      this.allUserInfo = res.users;
      this.paymentInfo = res.payments
      this.calculateTotals();

    }, (error) => {
      console.error(error);
    });
  }

  calculateTotals() {
    this.totalPayments = this.paymentInfo.length;
    this.totalAccepted = this.paymentInfo.filter(payment => payment.paymentStatus === 'accepted').length;
    this.totalRejected = this.paymentInfo.filter(payment => payment.paymentStatus === 'rejected').length;
    this.totalPending = this.paymentInfo.filter(payment => payment.paymentStatus === 'pending').length;
  }
}
