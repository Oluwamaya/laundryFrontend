import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule ,CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  public signUpForm : FormGroup
  constructor(public fb: FormBuilder , private http : HttpClient , private router : Router ){
  this.signUpForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    number: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    email: ['', [Validators.required, Validators.email]],
    adminLocation: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
}

get f() {
  return this.signUpForm.controls;
}


onSubmit() {
  if (this.signUpForm.valid) {
    console.log(this.signUpForm.value);

    const formData = new FormData()
    formData.append('firstName', this.signUpForm.get('firstName')?.value);
      formData.append('lastName', this.signUpForm.get('lastName')?.value);
      formData.append('number', this.signUpForm.get('number')?.value);
      formData.append('email', this.signUpForm.get('email')?.value);
      formData.append('password', this.signUpForm.get('password')?.value);
      formData.append('adminLocation', this.signUpForm.get('adminLocation')?.value);
    
    console.log(formData);
    this.http.post<any>("http://localhost/laundryBackend/authentication/usersignup.php",formData).subscribe((res)=>{
      console.log(res);
      alert(res.message)
      if (res.status == true) {
        this.signUpForm.reset();
        this.router.navigate(['/login'])
      }
    }, (error)=>{
      console.log(error);
      if (error.error.text == "<br />\n<b>Fatal error</b>: Uncaught mysqli_sql_exception: Duplicate entry ") {
        alert("Email or Number Already exist")
      }
      
    })
  } else {
    this.signUpForm.markAllAsTouched();
  }
}
}
