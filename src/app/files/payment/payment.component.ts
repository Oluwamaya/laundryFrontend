import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { faNairaSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule, FormsModule, CommonModule, HttpClientModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  public amount: number | undefined;
  public plan: string | undefined;
  confirmed: boolean = false;
  public userInfo: any | null = null;
  public paymentDetails: any = {};
  faNaira = faNairaSign;
  public previewImage: any | null; // To store base64 encoded image for preview
  public selectedFile: File | undefined;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem("allInfo")!);
    this.paymentDetails = JSON.parse(localStorage.getItem("paymentDetails")!);
    console.log(this.userInfo, this.paymentDetails);
  }
 
  onFileSelected(event: any) {
    const files: File = event.target.files[0];
    console.log(files);
    this.selectedFile = files
    const reader = new FileReader();

    reader.onload = () => {
        this.previewImage = reader.result as string;
    };

    reader.readAsDataURL(this.selectedFile);
}

   
  
  

 
 

  submitPayment() {
    console.log();
    
    if (!this.selectedFile) {
      alert('Please upload the payment receipt before submitting.');
      return;
    }
    const formData = new FormData()
    formData.append('file', this.selectedFile); 
    // Append other form data
    formData.append('userId', this.userInfo.id);
    formData.append('plan', this.paymentDetails.plan);
    formData.append('amount', this.paymentDetails.amount);
    formData.append('email', this.userInfo.email);
    formData.append('paymentStatus', 'pending');

    // Send formData to backend
    this.http.post<any>('http://localhost/laundryBackend/Dashboard/payment.php', formData).subscribe(
      (response) => {
        console.log('Payment submitted successfully:', response);
        if (response.status == true ) {
          alert("Payment submitted. Please wait for the agent to verify your payment.");
          this.router.navigate(['/dashboard'])
          // this.previewImage.reset()
        }else{
          alert(response.message)
          
        }
      },
      (error) => {
        console.error('Error submitting payment:', error);
      }
    );
  }
}
