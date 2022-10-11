import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { ProductInterface } from 'src/app/shared/models/product.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminProductsService {
  // apiUrl: string = 'https://fakestoreapi.com/products';
  apiUrl: string = environment.productsUrl;

  constructor(private http: HttpClient) {}

  getProducts(category: string = '') {
    return this.http.get<ProductInterface[]>(this.apiUrl);
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
}
