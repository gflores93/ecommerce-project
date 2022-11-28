import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { FilterPipe } from '../shared/pipes/filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MainRoutingModule } from './main-routing.module';
import { UsersService } from '../shared/services/users.service';
import { ProductsService } from '../shared/services/products.service';
import { CategoriesService } from '../shared/services/categories.service';
import { CartService } from './services/cart.service';
import { PaymentComponent } from './components/payment/payment.component';

@NgModule({
  declarations: [HeaderComponent, ProductsComponent, CartComponent, FilterPipe, PaymentComponent],
  imports: [CommonModule, MainRoutingModule, HttpClientModule, FormsModule],
  exports: [HeaderComponent, ProductsComponent, CartComponent],
  providers: [UsersService, ProductsService, CategoriesService, CartService],
})
export class MainModule {}
