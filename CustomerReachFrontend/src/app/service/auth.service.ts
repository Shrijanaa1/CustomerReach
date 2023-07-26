import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  private isLoggedIn: boolean = false;

  login() {
    // In a real application, you would perform login logic and set isLoggedIn to true upon successful login.
    // For now, we'll simulate a successful login.
    this.isLoggedIn = true;
  }

  logout() {
    // Perform logout logic and set isLoggedIn to false.
    this.isLoggedIn = false;
  }

  isLoggedInUser(): boolean {
    return this.isLoggedIn;
  }
}
