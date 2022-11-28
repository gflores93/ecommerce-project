import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductInterface } from 'src/app/shared/models/product.interface';
import { AdminProductsService } from '../../../services/admin-products.service';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, AfterViewInit {
  isLoading = false;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25];

  header: string = 'id';
  direction: string = 'asc';
  filterText: string = '';

  /* title, price, description, category */
  displayedColumns: string[] = [
    'title',
    'description',
    'category.name',
    'price',
    'active',
    'action'
  ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: AdminProductsService) {}

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.sort.disableClear = true;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'category.name':
          return item.category.name;
        default:
          return item[property];
      }
    };
  }

  // ngAfterViewChecked() {
  //   const list = document.getElementsByClassName('mat-paginator-range-label');
  //   list[0].innerHTML = 'Page: ' + this.currentPage.toString();
  // }

  ngOnInit(): void {
    this.getAllProducts();
  }

  openDialog() {
    this.dialog
      .open(ProductDialogComponent, {
        width: '30%'
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllProducts();
        }
      });
  }

  getAllProducts() {
    this.isLoading = true;
    this.api
      .getPaginatedProducts(
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

  editProduct(row: ProductInterface) {
    this.dialog
      .open(ProductDialogComponent, {
        width: '30%',
        data: row
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.getAllProducts();
        }
      });
  }

  deleteProduct(id: number) {
    this.api.deleteProduct(id).subscribe({
      next: (res) => {
        alert('Product was deleted sucessfully');
        this.getAllProducts();
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
    this.getAllProducts();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getAllProducts();
  }

  sortData(sort: Sort) {
    this.header = sort.active;
    this.direction = sort.direction;
    this.getAllProducts();
  }
}
