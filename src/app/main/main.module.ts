import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { FilterPipe } from '../shared/pipes/filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
  declarations: [HeaderComponent, ProductsComponent, CartComponent, FilterPipe],
  imports: [CommonModule, MainRoutingModule, HttpClientModule, FormsModule],
  exports: [HeaderComponent, ProductsComponent, CartComponent],
})
export class MainModule {}
