import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule,  } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-g-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule ,HttpClientModule],
  templateUrl: './g-login.component.html',
  styleUrls: ['./g-login.component.css']
})
export class GLoginComponent {
  public adminForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router ) {
    this.adminForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.adminForm.valid) {
      console.log('Form Submitted', this.adminForm.value);

      const formData = new FormData();
      formData.append("email", this.adminForm.get('email')?.value);
      formData.append("password", this.adminForm.get('password')?.value);

      this.http.post<any>("https://laundry.eaaafrica.org/Admin/aLogin.php", formData).subscribe((res) => {
        console.log(res);
        if (res.status == true) {
          alert('Welcome' + " ADMIN " + res.user.username);
          this.setTokenWithExpiry("lAdminToken", res.token, 2); // Set token with 2-hour expiry
          this.adminForm.reset();
          this.router.navigate(['/adminDashboard']);
        } else {
          alert(res.message);
        }
      }, (error) => {
        console.log(error);
      });
    } else {
      console.log('Form not valid');
    }
  }

  // Method to set token with expiry
  setTokenWithExpiry(key: string, value: string, hours: number) {
    const now = new Date();
    const expiry = now.getTime() + hours * 60 * 60 * 1000; // Calculate expiry time in milliseconds
    const item = {
      value: value,
      expiry: expiry
    };
    localStorage.setItem(key, JSON.stringify(item));
  }
}
