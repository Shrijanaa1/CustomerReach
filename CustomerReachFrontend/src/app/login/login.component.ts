import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../service/customer.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import the necessary form modules
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // Implement OnInit

  loginForm!: FormGroup; // Create a form group for login form
  message: string = '';

  private isLoggedIn: boolean = false;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private fb: FormBuilder, // Inject FormBuilder to create the form group
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      name: ['', Validators.required], // Username field with required validation
      password: ['', Validators.required], // Password field with required validation
    });
  }

  login() {
    // Check if the form is valid before submitting
    if (this.loginForm.invalid) {
      return;
    }

    // Handle the form submission and call the API service
    this.customerService.loginUser(this.loginForm.value).subscribe(
      (response) => {
        this.message = response.message;
        alert('Login Success!!');
        this.authService.login();
        this.router.navigate(['dashboard']);
        this.loginForm.reset(); // Reset the form after successful login
      },
      (error) => {
        console.log(error);
        this.message = 'Invalid username or password';
      }
    );
  }
}
