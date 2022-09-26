import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/main/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  @ViewChild('closeBtn') public closeBtn!: ElementRef;
  public cartSubscription!: Subscription;
  public products: any = [];
  public grandTotal: number = 0;
  public message: string = '';

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.getProducts().subscribe((res) => {
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    });
  }

  // unsubscribe every changing screen
  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }

  removeItem(item: any) {
    this.cartService.removeCartItem(item);
  }

  emptyCart() {
    this.cartService.removeAllCart();
  }

  updateQuantity(event: any, item: any) {
    let value =
      isNaN(event?.target?.value) || event?.target?.value <= 0
        ? 1
        : parseInt(event?.target?.value);
    event.target.value = value;
    this.cartService.updateQuantity(item, value);
  }

  confirmOrder() {
    this.message = 'Thanks for buying!';
    setTimeout(() => {
      this.closeBtn.nativeElement.click();
      this.cartService.removeAllCart();
    }, 2000);
  }
}
