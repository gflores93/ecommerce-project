import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminCategoriesService } from 'src/app/admin/services/admin-categories.service';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss']
})
export class AdminCategoriesComponent implements OnInit {
  isLoading = false;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25];

  header: string = 'id';
  direction: string = 'asc';
  filterText: string = '';

  /* title, price, description, category */
  displayedColumns: string[] = ['name', 'description', 'active', 'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: AdminCategoriesService) {}

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.sort.disableClear = true;
    this.dataSource.sort = this.sort;
  }

  // ngAfterViewChecked() {
  //   const list = document.getElementsByClassName('mat-paginator-range-label');
  //   list[0].innerHTML = 'Page: ' + this.currentPage.toString();
  // }

  ngOnInit(): void {
    this.getAllCategories();
  }

  openDialog() {
    this.dialog
      .open(CategoryDialogComponent, {
        width: '30%'
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllCategories();
        }
      });
  }

  getAllCategories() {
    this.isLoading = true;
    this.api
      .getPaginatedCategories(
        this.currentPage + 1,
        this.pageSize,
        this.header,
        this.direction,
        this.filterText
      )
      .subscribe({
        next: (res) => {
          this.dataSource.data = res.body || [];
          console.log(this.dataSource.data);
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

  editCategory(row: any) {
    this.dialog
      .open(CategoryDialogComponent, {
        width: '30%',
        data: row
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.getAllCategories();
        }
      });
  }

  deleteCategory(id: number) {
    this.api.deleteCategory(id).subscribe({
      next: (res) => {
        alert('Product was deleted sucessfully');
        this.getAllCategories();
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      },
      error: (err) => {
        alert('Error while deleting product');
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
    this.filterText = filterValue.trim().toLowerCase();
    this.getAllCategories();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getAllCategories();
  }

  sortData(sort: Sort) {
    this.header = sort.active;
    this.direction = sort.direction;
    this.getAllCategories();
  }
}
