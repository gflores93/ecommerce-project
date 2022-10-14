import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductInterface } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  // apiUrl: string = 'https://fakestoreapi.com/products';
  apiUrl: string = environment.productsUrl; // copied from the fake api

  constructor(private http: HttpClient) {}

  //https://fakestoreapi.com/products
  /*
  The pipe method is for chaining observable operators,
  and the subscribe is for activating the observable and listening for emitted values.

  .subscribe() methods accepts both observer object(can include next(), error(), complete()) 
  and inline handlers (can pass null to unimplemented handler)

  Observable stream 
  .pipe() can be used to define the handlers in the stream (map(), catchError(), finalize())

 */
  // Observable stream that wont do nothing by iteself, to execute it we need to subscribe to it
  // pipe is used to combine serveral functions after get got our observable
  // getProduct() {
  //   return this.http.get<any>(this.apiUrl).pipe(
  //     //shareReplay() //multicast, there is no need to do multiple calls
  //     map((res: ProductInterface[]) => {
  //       console.log('products', res);
  //       return res;
  //     })
  //   );
  // }

  getProducts(categoryId: number = 1) {
    return this.http.get<ProductInterface[]>(
      categoryId > 0 ? this.apiUrl + '?categoryId=' + categoryId : this.apiUrl
    );
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
