import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserInterface } from 'src/app/shared/models/user.interface';
import { Role } from 'src/app/shared/models/role';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = environment.usersUrl;
  loggedIn: boolean = false;
  userLogged: BehaviorSubject<string> = new BehaviorSubject<string>('');
  userRole: Role = Role.User;

  constructor(private http: HttpClient, private router: Router) {}

  isAuthenticated() {
    const promise = new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedIn);
      }, 800);
    });
    return promise;
  }

  login(user: UserInterface) {
    console.log('User logged in:', user);
    this.userLogged.next(user.username);
    this.userRole = user.role;
    this.loggedIn = true;
  }

  logout() {
    console.log('User logged out:');
    this.loggedIn = false;
    this.userLogged.next('');
    this.userRole = Role.User;
    this.router.navigate(['login']);
  }
}
