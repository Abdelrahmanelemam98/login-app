import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IUser } from '../model/iuser';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://dummyjson.com/auth/login'; // Corrected spelling of 'baseUrl'
  http = inject(HttpClient);

  private loginStatus = new BehaviorSubject<boolean>(this.hasToken());
  isLogin$: Observable<boolean> = this.loginStatus.asObservable();

  constructor() {}

  login(user: IUser): Observable<IUser> {
    return this.http
      .post<IUser>(this.baseUrl, user, { withCredentials: true })
      .pipe(
        tap((response) => {
          if (response.accessToken) {
            this.setToken(response.accessToken);
            this.loginStatus.next(true);
          }
        }),
        catchError((error) => {
          console.error('Login failed', error);
          return throwError(() => new Error('Login failed. Please try again.'));
        })
      );
  }

  setToken(token: string) {
    localStorage.setItem('auth', token);
  }

  hasToken(): boolean {
    return !!localStorage.getItem('auth');
  }

  logout() {
    localStorage.removeItem('auth');
    this.loginStatus.next(false);
  }
}
