import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminUsersService } from '../../services/admin-users.service';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
})
export class AdminUsersComponent implements OnInit {
  /* username, email, password, role */
  displayedColumns: string[] = [
    'username',
    'role',
    'email',
    'password',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: AdminUsersService) {}
  ngOnInit(): void {
    this.getAllUsers();
  }

  openDialog() {
    this.dialog
      .open(UserDialogComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllUsers();
        }
      });
  }

  getAllUsers() {
    this.api.getUsers().subscribe({
      next: (res) => {
        const users: any = [...res];
        users.map((u: any) => (u.visible = false));
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert('Error while fetching the records!');
      },
    });
  }

  editUser(row: any) {
    this.dialog
      .open(UserDialogComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.getAllUsers();
        }
      });
  }

  deleteUser(id: number) {
    this.api.deleteUser(id).subscribe({
      next: (res) => {
        alert('User was deleted sucessfully');
        this.getAllUsers();
      },
      error: (err) => {
        alert('Error while deleting user');
      },
    });
  }

  togglePass(row: any) {
    row.visible = !row.visible;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
