import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminUsersService } from '../../../services/admin-users.service';
import { PasswordDialogComponent } from '../password-dialog/password-dialog.component';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit, AfterViewInit {
  isLoading = false;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25];

  header: string = 'id';
  direction: string = 'asc';
  filterText: string = '';

  /* username, email, password, role */
  displayedColumns: string[] = ['username', 'role', 'email', 'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  hiddenPassword: string = '***************';

  constructor(private dialog: MatDialog, private api: AdminUsersService) {}

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.sort.disableClear = true;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  openDialog() {
    this.dialog
      .open(UserDialogComponent, {
        width: '30%'
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllUsers();
        }
      });
  }

  getAllUsers() {
    this.isLoading = true;
    this.api
      .getPaginatedUsers(
        this.currentPage + 1,
        this.pageSize,
        this.header,
        this.direction,
        this.filterText
      )
      .subscribe({
        next: (res) => {
          this.dataSource.data = res.body || [];
          setTimeout(() => {
            this.paginator.pageIndex = this.currentPage;
            this.paginator.length = res.headers.get('X-Total-Count'); // total rows in the table (required for pagination)
          });
          this.isLoading = false;
        },
        error: (err) => {
          alert('Error while fetching the records!');
          this.isLoading = false;
        }
      });
  }

  editUser(row: any) {
    this.dialog
      .open(UserDialogComponent, {
        width: '30%',
        data: row
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
      }
    });
  }

  changePassword(row: any) {
    this.dialog
      .open(PasswordDialogComponent, {
        width: '30%',
        data: row
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'change') {
          this.getAllUsers();
        }
      });
  }

  togglePass(row: any) {
    row.visible = !row.visible;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
    this.filterText = filterValue.trim().toLowerCase();
    this.getAllUsers();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getAllUsers();
  }

  sortData(sort: Sort) {
    this.header = sort.active;
    this.direction = sort.direction;
    this.getAllUsers();
  }
}
