import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../services/user';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';
  errorMsg = '';
  userService = inject(User);
  router = inject(Router);

  onSubmit() {
    if (!this.email || !this.password) {
      this.errorMsg = 'Email and password are required.';
      return;
    }
    const success = this.userService.login(this.email, this.password);
    if (success) {
      this.router.navigate(['/profile']);
    } else {
      this.errorMsg = 'Invalid email or password.';
    }
  }
}
