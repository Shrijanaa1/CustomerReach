import { Component } from '@angular/core';
import { CustomerService } from '../service/customer.service';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  user: any = {}; //Initialize an empty user object to store form data
  message: string = '';

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private authService: AuthService //Injecting AuthService
  ) {}

  register() {
    // Handle the form submission and call the API service
    this.customerService.registerUser(this.user).subscribe(
      (response) => {
        this.message = response.message;
        alert('Successfully Registered!!');
        // this.router.navigate(["login"]);
        // this.user = {};

        //After successful registration, set isLoggedIn to true,
        this.authService.login();
        this.router.navigate(['login']);
        this.user = {};
      },
      (error) => {
        console.log(error);
        this.message = 'Something Went Wrong!! ';
      }
    );
  }
}
