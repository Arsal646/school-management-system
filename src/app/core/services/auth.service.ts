import { Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { users } from '../users';

export interface UserDetail {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  users = users;
  constructor(private router: Router) {}

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  // login({ email, password }: any): Observable<any> {
  //   if (email === 'admin@gmail.com' && password === 'admin@123$') {
  //     this.setToken('abcdefghijklmnopqrstuvwxyz');
  //     return of({ name: 'Arslan Iftikhar', email: 'admin@gmail.com' });
  //   }
  //   return throwError(new Error('Failed to login'));
  // }

  login({
    email,
    password,
  }: UserDetail): Observable<{ name: string; email: string }> {
    const user = this.users.find(
      (u) => u.username === email && u.password === password
    );
    if (user) {
      this.setToken('abcdefghijklmnopqrstuvwxyz');
      return of({ name: user.username, email: user.username + '@example.com' });
    }
    return throwError(new Error('Failed to login'));
  }
}
