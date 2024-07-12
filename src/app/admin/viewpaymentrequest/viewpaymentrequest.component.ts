import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-viewpaymentrequest',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, HttpClientModule],
  templateUrl: './viewpaymentrequest.component.html',
  styleUrls: ['./viewpaymentrequest.component.css']
})
export class ViewpaymentrequestComponent implements OnInit {
  faBar = faBars;
  public childpayment: boolean[] = [false, false, false, false, false, false];
  public paymentInfo: any[] = [];
  public pendingPayments: any[] = [];
  public acceptedPayments: any[] = [];
  public rejectedPayments: any[] = [];
  totalPayments: number = 0;
  totalAccepted: number = 0;
  totalRejected: number = 0;
  totalPending: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getAllUserInfo();
  }

  toggleChildPayment(index: number): void {
    this.childpayment = this.childpayment.map((_, i) => i === index);
  }

  hideChildPayment(): void {
    this.childpayment = this.childpayment.map(() => false);
  }

  getAllUserInfo() {
    this.http.post<any>("http://localhost/laundryBackend/admin/fetchAllUsers.php", {}).subscribe((res) => {
      console.log(res);

      this.paymentInfo = res.payments;
      this.filterPayments();
      this.calculateTotals();
    }, (error) => {
      console.error(error);
    });
  }

  filterPayments() {
    this.pendingPayments = this.paymentInfo.filter(payment => payment.paymentStatus === 'pending');
    this.acceptedPayments = this.paymentInfo.filter(payment => payment.paymentStatus === 'accepted');
    this.rejectedPayments = this.paymentInfo.filter(payment => payment.paymentStatus === 'rejected');
  }

  calculateTotals() {
    this.totalPayments = this.paymentInfo.length;
    this.totalAccepted = this.acceptedPayments.length;
    this.totalRejected = this.rejectedPayments.length;
    this.totalPending = this.pendingPayments.length;
  }

  acceptBtn(index : number){
    console.log(index);
    const payment = this.pendingPayments[index];
    alert("accepted")  
    console.log(payment)

    const formData = new FormData()
    formData.append("userId", payment.userId),
    formData.append("plan", payment.plan),
    formData.append("amount", payment.amount),
    formData.append("status", "Active"),
    formData.append("paymentStatus","Accepted"),
   
    this.http.post<any>("http://localhost/laundryBackend/admin/acceptPayment.php" ,formData).subscribe((res)=>{
      console.log(res);
      
    },(error)=>{
      console.log(error);
      
    })

  }
  rejectBtn(id : any){
    console.log(id);
    
    alert("rejected")
  }
}
