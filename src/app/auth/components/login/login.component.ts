import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/shared/models/role';
import { UserInterface } from 'src/app/shared/models/user.interface';
import { UsersService } from 'src/app/shared/services/users.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onLogin() {
    this.usersService.getUsers().subscribe({
      next: (res) => {
        const user = res.find(
          (a: UserInterface) =>
            a.email === this.loginForm.value.email &&
            a.password === this.loginForm.value.password
        );
        if (user) {
          this.loginForm.reset();
          this.authService.login(user);
          console.log('Login successful');
        } else {
          alert('User not found');
        }
      },
      error: (err) => {
        alert('Something went wrong');
      },
    });
  }
}
