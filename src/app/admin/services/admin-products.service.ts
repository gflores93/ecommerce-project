import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { ProductInterface } from 'src/app/shared/models/product.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminProductsService {
  // apiUrl: string = 'https://fakestoreapi.com/products';
  apiUrl: string = environment.productsUrl;

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<ProductInterface[]>(this.apiUrl + '?_expand=category');
  }

  postProduct(data: ProductInterface) {
    return this.http.post<any>(this.apiUrl, data);
  }

  putProduct(data: ProductInterface, id: number) {
    return this.http.put<any>(this.apiUrl + id, data);
  }

  deleteProduct(id: number) {
    return this.http.delete<any>(this.apiUrl + id);
  }

  // /posts?_page=7&_limit=20
  // /posts?_sort=views&_order=asc
  // /posts?title_like=server
  // products?_expand=category
  getPaginatedProducts(
    currentPage: number = 1,
    pageSize: number = 5,
    header: string = 'id',
    direction: string = 'asc',
    filterText: string = ''
  ) {
    const filter = filterText.length ? '&title_like=' + filterText : '';
    // {observe: 'response'} as argument helps to provide extra info as res.headers('X-Total-Count')
    return this.http.get<ProductInterface[]>(
      this.apiUrl +
        `?_expand=category&_page=${currentPage}&_limit=${pageSize}&_sort=${header}&_order=${direction}${filter}`,
      {
        observe: 'response'
      }
    );
  }
}
