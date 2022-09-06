import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUrl: string = 'http://localhost:3000/signupUsers/';
  loggedIn: boolean = false;
  userLogged: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http: HttpClient, private router: Router) {}

  post(data: any) {
    return this.http.post<any>(this.authUrl, data);
  }

  get() {
    return this.http.get<any>(this.authUrl);
  }

  put(data: any, id: number) {
    return this.http.put<any>(this.authUrl + id, data);
  }

  delete(id: number) {
    return this.http.delete<any>(this.authUrl + id);
  }

  isAuthenticated() {
    const promise = new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedIn);
      }, 800);
    });
    return promise;
  }
  login(user: any) {
    console.log('User logged in:', user);
    this.userLogged.next(user);
    this.loggedIn = true;
  }
  logout() {
    console.log('User logged out:');
    this.loggedIn = false;
    this.userLogged.next('');
    this.router.navigate(['login']);
  }
}
