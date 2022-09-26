import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/shared/models/role';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }

  onSubmit() {
    const newUser = this.registerForm.value;
    newUser.role = Role.User;
    this.usersService.postUser(newUser).subscribe({
      next: (res: any) => {
        console.log('Signup successful', res);
        this.registerForm.reset();
        this.router.navigate(['login']);
      },
      error: (err) => {
        alert('something went wrong');
        console.log(err.message);
      },
    });
  }
}
