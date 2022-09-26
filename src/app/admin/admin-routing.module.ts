import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';

const routes: Routes = [
  { path: 'users', component: AdminUsersComponent },
  { path: 'products', component: AdminProductsComponent },
  {
    path: '',
    component: AdminMenuComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
