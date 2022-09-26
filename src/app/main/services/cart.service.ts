import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductInterface } from '../../shared/models/product.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItemList: any = [];
  // Header, Products and Cart component subscribe to getProducts() which returns this subject as observable
  public productList = new BehaviorSubject<ProductInterface[]>([]);

  public alert: any = {
    msg: '',
    type: 0,
  };

  constructor() {}

  /* 
  This method returns an observable, so subscriptions will be done to an Observable instead of a BehaviorSubject
  you can't send values to an Observable using next() method
  */
  getProducts() {
    return this.productList.asObservable();
  }

  // Include new data and pass the cartItemList emitting the observable, so the subscribers can see the changes
  addToCart(product: ProductInterface): any {
    if (this.cartItemList.some((e: any) => e.id === product.id)) {
      this.alert.msg = 'Item already included in the cart';
      this.alert.type = 2; // Already there
    } else {
      this.cartItemList.push(product);
      this.alert.msg = 'Item included to the cart!';
      this.alert.type = 1; // Inserted
    }
    this.productList.next(this.cartItemList);
    return this.alert;
  }

  getTotalPrice(): number {
    let grandTotal = this.cartItemList.reduce(
      (partialSum: number, a: ProductInterface) => partialSum + a.total,
      0
    );
    return Math.round(grandTotal * 100) / 100;
  }

  // Whenever the data is modified .next() is executed to emit the updated list to the subscribers
  removeCartItem(product: ProductInterface) {
    this.cartItemList = this.cartItemList.filter(
      (a: ProductInterface) => a.id != product.id
    );
    this.productList.next(this.cartItemList);
  }

  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }

  updateQuantity(item: ProductInterface, value: number) {
    item.quantity = value;
    item.total = Math.round(item.quantity * item.price * 100) / 100;
    this.productList.next(this.cartItemList);
  }
}
