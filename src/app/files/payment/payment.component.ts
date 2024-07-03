import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faNairaSign } from '@fortawesome/free-solid-svg-icons';

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
  previewImage: string | ArrayBuffer | null = null;
  confirmed: boolean = false;
  public userInfo: any | null = null; // Use 'any' or define an interface for userInfo

  faNaira = faNairaSign;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem("allInfo")!);
    console.log(this.userInfo);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.previewImage = reader.result;
    };

    reader.readAsDataURL(file);
  }

  submitPayment() {
    // Logic to submit payment
    if (!this.previewImage) {
      alert('Please upload the payment receipt before submitting.');
      return;
    }

    // Create FormData object
    const formData = new FormData();
    formData.append('file', this.previewImage as string); // Assuming 'previewImage' is a string

    // Append other form data
    formData.append('userId', this.userInfo.id); // Adjust as per your userInfo structure

    // Example: Send formData to backend
    this.http.post<any>('http://localhost:3000/upload', formData).subscribe(
      (response) => {
        console.log('Payment submitted successfully:', response);
        // Handle response as needed
      },
      (error) => {
        console.error('Error submitting payment:', error);
        // Handle error
      }
    );
  }
}
