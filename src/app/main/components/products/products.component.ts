import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { CartService } from 'src/app/main/services/cart.service';
import { SearchService } from 'src/app/main/services/search.service';
import { ProductInterface } from 'src/app/shared/models/product.interface';
import { Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { CategoryInterface } from 'src/app/shared/models/category.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  categories: Array<any> = [];
  public productsList!: ProductInterface[];
  public searchKey: string = '';
  public loading: boolean = true;
  // 1: inserted, 2: already inserted, 3: deleted
  public alert: any = {};
  public productsSubscription: Subscription = new Subscription();

  constructor(
    private api: ProductsService,
    private cartService: CartService,
    private searchService: SearchService,
    private categoriesService: CategoriesService
  ) {}

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.categoriesService
      .getCategories()
      .subscribe((categories: CategoryInterface[]) => {
        this.categories = categories.filter((c) => c.active);
        this.filterByCategory();
      });

    // subscribe to the observable that is emmited from the header component
    this.searchService.searchText.subscribe((val: string) => {
      this.searchKey = val;
    });
  }

  addToCart(product: any) {
    this.alert = this.cartService.addToCart(product);
  }

  // used for the alert
  onDismissError() {
    this.alert = undefined;
  }

  filterByCategory(categoryId: number = 1) {
    // this.categoryList = this.productList.filter(
    //   (a: any) => a.category === category || category === ''
    // );
    this.searchService.updateText('');
    if (this.productsSubscription) this.productsSubscription.unsubscribe();
    this.loading = true;
    this.productsSubscription = this.api.getProducts(categoryId).subscribe({
      next: (res) => {
        if (res.length) {
          this.productsList = res;
          this.productsList.forEach((a: ProductInterface) => {
            Object.assign(a, { quantity: 1, total: a.price }); //assign extra properties to each object
          });
        } else {
          alert('There are no products of this category');
        }
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
