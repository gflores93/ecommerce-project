import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
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
    this.authService.get().subscribe({
      next: (res) => {
        const user = res.find(
          (a: any) =>
            a.email === this.loginForm.value.email &&
            a.password === this.loginForm.value.password
        );
        if (user) {
          console.log('Login successful');
          this.loginForm.reset();
          this.authService.login(user?.username);
          this.router.navigate(['products']);
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
