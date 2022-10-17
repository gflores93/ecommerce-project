import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
  ValidationErrors
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserInterface } from 'src/app/shared/models/user.interface';
import { AdminUsersService } from '../../../services/admin-users.service';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.scss']
})
export class PasswordDialogComponent implements OnInit {
  userRoles = ['User', 'Admin', 'Test'];

  userForm!: FormGroup;
  actionBtn: string = 'Change';
  show: boolean = false;
  showNewPass: boolean = false;
  showConfirmPass: boolean = false;

  password?: AbstractControl;
  newPassword?: AbstractControl;
  confirmPassword?: AbstractControl;

  validPass: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private api: AdminUsersService,
    private dialogRef: MatDialogRef<PasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  ngOnInit(): void {
    console.log('userData', this.editData);
    /* username, email, password, role */
    this.userForm = this.formBuilder.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        role: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(5)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(5)]]
      },
      { validators: [this.checkPasswords, this.checkCurrentPass] }
    );

    this.password = this.userForm.controls['password'];
    this.newPassword = this.userForm.controls['newPassword'];
    this.confirmPassword = this.userForm.controls['confirmPassword'];

    if (this.editData) {
      this.userForm.controls['username'].setValue(this.editData.username);
      this.userForm.controls['email'].setValue(this.editData.email);
      this.userForm.controls['role'].setValue(this.editData.role);
    }
  }

  changePassword() {
    // check if the current password is correct
    this.api.getUsers().subscribe({
      next: (res) => {
        const user = res.find(
          (a: UserInterface) =>
            a.email === this.userForm.value.email &&
            a.password === this.userForm.value.password
        );
        if (user) {
          this.validPass = true;
          // Update the password
          this.userForm.value.password = this.userForm.value.newPassword;
          // Create a copy and remove uncessary properties before updating user
          let updatedUser = Object.assign({}, this.userForm.value);
          delete updatedUser.newPassword;
          delete updatedUser.confirmPassword;

          this.api.putUser(updatedUser, this.editData.id).subscribe({
            next: (res) => {
              alert('Password changed successfully');
              console.log(res);
              this.userForm.reset();
              this.dialogRef.close('change');
            },
            error: (err) => {
              alert('Error while updating the record');
            }
          });
        } else {
          this.validPass = false;
          this.userForm.controls['password'].setValue('');
          this.userForm.controls['newPassword'].setValue('');
          this.userForm.controls['confirmPassword'].setValue('');
        }
      },
      error: (err) => {
        alert('Something went wrong');
      }
    });
  }

  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let pass = group.value.newPassword;
    let confirmPass = group.value.confirmPassword;
    return pass === confirmPass ? null : { notSame: true };
  };

  checkCurrentPass: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    if (group.value.password?.length) this.validPass = true;
    return this.validPass ? null : { incorrectPass: true };
  };
}
