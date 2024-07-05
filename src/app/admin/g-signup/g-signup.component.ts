import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-g-signup',
  standalone: true,
  imports: [ReactiveFormsModule , CommonModule , HttpClientModule ],
  templateUrl: './g-signup.component.html',
  styleUrl: './g-signup.component.css'
})
export class GSignupComponent {
  public adminForm : FormGroup

  constructor(private fb: FormBuilder ,private http : HttpClient ,private router: Router) {
    this.adminForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ match: true });
      return { match: true };
    } else {
      return null;
    }
  }
  onSubmit() {
    if (this.adminForm.valid) {
      console.log('Form Submitted', this.adminForm.value);

      const formData = new FormData()
       formData.append("username", this.adminForm.get('username')?.value) 
       formData.append("email", this.adminForm.get('email')?.value) 
       formData.append("password", this.adminForm.get('password')?.value) 
       formData.append("confirmPassword", this.adminForm.get('confirmPassword')?.value) 
        
       this.http.post<any>("https://laundry.eaaafrica.org/Admin/aSignup.php", formData).subscribe((res)=>{
        console.log(res);
        alert(res.message)
        if (res.status == true) {
        this.router.navigate(["/sooAlogin"])
         this.adminForm.reset() 
        }
    
       },(error)=>{
        console.log(error);
        
       })
    } else {
      console.log('Form not valid');
    }
  }

}
