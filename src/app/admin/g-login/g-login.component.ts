import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

declare const google: any;

@Component({
  selector: 'app-g-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './g-login.component.html',
  styleUrls: ['./g-login.component.css']
})
export class GLoginComponent implements OnInit {
  public adminForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.adminForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    if (typeof google !== 'undefined') {
    google.accounts.id.initialize({
      client_id: '432718818389-gflq4ed5j5psr5ptad441qdn2fu2qv04.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      document.getElementById("googleSignInButton"),
      { theme: "outline", size: "large" }
    );
  } else {
    console.error('Google API not loaded');
  }
  }

  handleCredentialResponse(response: any) {
    const user = this.parseJwt(response.credential);
    console.log(user);

    if (user) {
      const formData = new FormData();
      formData.append('id_token', user.idToken);
      formData.append('email', user.email);
      formData.append('name', user.name);
      formData.append('google_id', user.sub);
      
      this.http.post<any>("http://localhost/laundryBackend/callback.php", formData).subscribe((res)=>{
       console.log(res);
      if (res.status == true) {
        alert(`Welcome ${user.name}`);
        this.setTokenWithExpiry("lAdminToken", res.token, 2);
        this.ngZone.run(() => this.router.navigate(['/adminDashboard']));
      }else{
        console.log(res.message);
        
      }
      }, (error)=>{
        console.log(error);
        
      })
    }
  }

  parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
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
    const expiry = Date.now() + hours * 60 * 60 * 1000; // Calculate expiry time in milliseconds
    const item = {
      value: value,
      expiry: expiry
    };
    localStorage.setItem(key, JSON.stringify(item));
  }
}
