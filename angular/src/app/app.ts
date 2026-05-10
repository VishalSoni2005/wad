import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { User } from './services/user';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('00_Angular');
  userService = inject(User);
  router = inject(Router);

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
