import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User, UserProfile } from '../services/user';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  userModel: UserProfile = { name: '', email: '', password: '' };
  errorMsg = '';
  userService = inject(User);
  router = inject(Router);

  onSubmit() {
    if (!this.userModel.name || !this.userModel.email || !this.userModel.password) {
      this.errorMsg = 'All fields are required.';
      return;
    }
    const success = this.userService.register(this.userModel);
    if (success) {
      this.router.navigate(['/login']);
    } else {
      this.errorMsg = 'Email already registered.';
    }
  }
}
