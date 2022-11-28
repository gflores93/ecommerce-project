import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminUsersService } from '../../../services/admin-users.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
})
export class UserDialogComponent implements OnInit {
  userRoles = ['User', 'Admin', 'Test'];

  userForm!: FormGroup;
  actionBtn: string = 'Save';
  hide: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private api: AdminUsersService,
    private dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  ngOnInit(): void {
    /* username, email, password, role */
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      role: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = 'Update';
      this.userForm.controls['username'].setValue(this.editData.username);
      this.userForm.controls['email'].setValue(this.editData.email);
      this.userForm.controls['password'].setValue(this.editData.password);
      this.userForm.controls['role'].setValue(this.editData.role);
    }
  }

  adduser(): void {
    if (!this.editData) {
      if (this.userForm.valid) {
        this.api.postUser(this.userForm.value).subscribe({
          next: (res) => {
            alert('user added successfully');
            this.userForm.reset();
            this.dialogRef.close('save');
          },
          error: (err) => {
            alert('Error while adding the user');
          },
        });
      }
    } else {
      this.updateuser();
    }
  }

  updateuser() {
    this.api.putUser(this.userForm.value, this.editData.id).subscribe({
      next: (res) => {
        alert('user updated successfully');
        this.userForm.reset();
        this.dialogRef.close('update');
      },
      error: (err) => {
        alert('Error while updating the record');
      },
    });
  }
}
