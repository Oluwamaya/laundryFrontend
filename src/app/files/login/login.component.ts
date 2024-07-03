import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink ,ReactiveFormsModule,HttpClientModule , CommonModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public loginForm : FormGroup
  constructor(private fb: FormBuilder , private http : HttpClient , private router : Router){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);

      const formData = new FormData();
      formData.append('email', this.loginForm.get('email')?.value);
      formData.append('password', this.loginForm.get('password')?.value);

      this.http.post<any>("http://localhost/laundryBackend/authentication/userlogin.php", formData).subscribe(res => {
        console.log(res);
        if (res.status == true) {
          alert('Welcome'+ " " + res.user.lastName)
          localStorage.setItem("lUserToken", res.token)
          this.loginForm.reset();
          this.router.navigate(['/Dashboard']); 
        }else{
          alert(res.message);

        }
      }, error => {
        console.log(error);
        alert("Invalid email or password.");
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

}
