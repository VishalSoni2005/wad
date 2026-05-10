import { Injectable, signal } from '@angular/core';

export interface UserProfile {
  name: string;
  email: string;
  password?: string; // Optional for security, but we keep it simple for mock purposes
}

@Injectable({
  providedIn: 'root',
})
export class User {
  private currentUserSignal = signal<UserProfile | null>(null);
  readonly currentUser = this.currentUserSignal.asReadonly();

  constructor() {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('currentUser');
      if (stored) {
        this.currentUserSignal.set(JSON.parse(stored));
      }
    }
  }

  register(user: UserProfile): boolean {
    if (typeof window !== 'undefined') {
      const users: UserProfile[] = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.find(u => u.email === user.email)) {
        return false; // Email already exists
      }
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
      return true;
    }
    return false;
  }

  login(email: string, password?: string): boolean {
    if (typeof window !== 'undefined') {
      const users: UserProfile[] = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        this.currentUserSignal.set(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        return true;
      }
    }
    return false;
  }

  logout(): void {
    this.currentUserSignal.set(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser');
    }
  }

  isLoggedIn(): boolean {
    return this.currentUserSignal() !== null;
  }
}
