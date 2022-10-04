import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainGuard } from '../auth/services/main-guard.service';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  {
    path: 'products',
    canActivate: [MainGuard],
    component: ProductsComponent,
  },
  { path: 'cart', canActivate: [MainGuard], component: CartComponent },
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
