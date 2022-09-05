import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';
import { SearchService } from 'src/app/service/search.service';
import { ProductInterface } from 'src/app/types/product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  categories: Array<any> = [
    {
      name: 'All products',
      description: '',
      imgUrl: 'https://images.pexels.com/photos/1517355/pexels-photo-1517355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      category: ''
    },
    {
      name: 'Fashion',
      description: 'Helmets, Shoulder pads, Faceguards',
      imgUrl: 'https://images.pexels.com/photos/994517/pexels-photo-994517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      category: 'fashion'
    },
    {
      name: 'Jewelry',
      description: 'Protective gear, Jaw Pads, Mouseguards Back Plates, Visors, Pads, Bags,',
      imgUrl: 'https://images.pexels.com/photos/10475792/pexels-photo-10475792.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      category: 'jewelery'
    },
    {
      name: 'Electronics',
      description: 'Jerseys, Pants, Cleats, Gloves, Vests, Belts',
      imgUrl: 'https://images.pexels.com/photos/8346914/pexels-photo-8346914.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      category: 'electronics'
    },
  ];
  public productList!: ProductInterface[];
  public categoryList!: ProductInterface[];
  public searchKey: string = '';
  public loading: boolean = true;
  // 1: inserted, 2: already inserted, 3: deleted
  public alert: any = {};
  constructor(
    private api: ApiService,
    private cartService: CartService,
    private searchService: SearchService
    ) { }

  ngOnInit(): void {
    this.loading = true;
    this.api.getProduct()
    .subscribe({
      next: (res) => {
         this.productList = res;
         this.categoryList = res;
         this.productList.forEach((a: ProductInterface) => {
          if(a.category.includes('clothing')) a.category = 'fashion';
          // Object.assign(a, {quantity: 1, total: a.price}); //assign extra properties to each object
          a.quantity = 1;
          a.total = a.price;
         });
        },
      complete: () => { this.loading = false; }
    });

    // subscribe to the observable that is emmited from the header component
    this.searchService.searchText.subscribe((val: string) => {
      this.searchKey = val;
    })
  }

  addToCart(product: any) {
    this.alert = this.cartService.addToCart(product);
  }

  // used for the alert
  onDismissError() {
    this.alert = undefined;
  }

  filterByCategory(category: string) {
    this.categoryList = this.productList
    .filter((a: any) => a.category === category || category === '');
  }

}
