import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = environment.usersUrl;
  loggedIn: boolean = false;
  userLogged: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http: HttpClient, private router: Router) {}

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
