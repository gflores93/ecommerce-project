import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';

@NgModule({
  declarations: [
    AdminProductsComponent,
    AdminUsersComponent,
    AdminMenuComponent,
  ],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
