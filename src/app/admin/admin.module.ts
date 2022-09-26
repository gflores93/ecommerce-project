import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';

@NgModule({
  declarations: [
    AdminProductsComponent,
    AdminUsersComponent,
    AdminMenuComponent,
  ],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
