import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { CartService } from 'src/app/main/services/cart.service';
import { SearchService } from 'src/app/main/services/search.service';
import { ProductInterface } from 'src/app/shared/models/product.interface';
import { Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { CategoryInterface } from 'src/app/shared/models/category.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserInterface } from 'src/app/shared/models/user.interface';
import { FavoritesService } from 'src/app/shared/services/favorites.service';

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
  public user?: UserInterface;
  public favorites?: number[];

  public favoriteCategory: CategoryInterface = {
    name: 'Favorites',
    description: 'Favorites',
    imgUrl:
      'https://images.pexels.com/photos/1625154/pexels-photo-1625154.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    id: -1,
    active: true
  };

  constructor(
    private api: ProductsService,
    private cartService: CartService,
    private searchService: SearchService,
    private categoriesService: CategoriesService,
    private favoritesService: FavoritesService
  ) {}

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');

    this.categoriesService
      .getCategories()
      .subscribe((categories: CategoryInterface[]) => {
        this.categories = categories.filter((c) => c.active);
        this.categories.push(this.favoriteCategory);
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

  addToFavorite(product: any) {
    if (this.favorites?.includes(product.id)) {
      this.favorites.splice(this.favorites.indexOf(product.id), 1);
    } else {
      this.favorites?.push(product.id);
    }
    // create object and include it or update it
    const userFavs: any = {
      id: this.user?.id,
      userId: this.user?.id,
      products: this.favorites
    };
    this.favoritesService.putFavorite(userFavs, this.user?.id).subscribe({
      next: (res) => {
        this.filterByCategory();
      },
      error: (err) => {
        // checks if it failed due to inexistent id
        if (err.status === 404) {
          this.favoritesService.postFavorite(userFavs).subscribe((res) => {
            this.filterByCategory();
          });
        }
      }
    });
  }

  // used for the alert
  onDismissError() {
    this.alert = undefined;
  }

  filterByCategory(categoryId: number = 1) {
    this.searchService.updateText('');
    if (this.productsSubscription) this.productsSubscription.unsubscribe();
    this.loading = true;
    this.productsSubscription = this.api.getProducts(categoryId).subscribe({
      next: (res) => {
        if (res.length) {
          this.productsList = res;
          this.favoritesService
            .getFavorites(this.user!.id)
            .subscribe((favorites: any) => {
              // Get favorites
              this.favorites = favorites[0]?.products || [];
              // asign extra properties
              this.productsList.forEach((a: ProductInterface) => {
                Object.assign(a, {
                  quantity: 1,
                  total: a.price,
                  isFavorite: this.favorites?.includes(a.id!)
                });
              });
              // Only show favorites (when filtering by favorites)
              if (categoryId === -1) {
                this.productsList = this.productsList.filter(
                  (p) => p.isFavorite
                );
              }
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
