import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent {
  email!: string; 
  token!: string;
  error: string | undefined;
  message: string | undefined;
  constructor(private http: HttpClient, private router: Router) { }
  submitForm() {
    const formData = new FormData();
    formData.append('email', this.email);

    this.http.post('http://localhost:9090/reset/forgot_password', formData)
      .subscribe(
        () => {
          this.message = 'We have sent a reset password link to your email. Please check.';
        },
        error => {
          this.error = error.error;
        }
      );
  }

}
