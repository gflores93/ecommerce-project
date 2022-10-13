import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminProductsComponent } from './components/products/admin-products/admin-products.component';
import { AdminUsersComponent } from './components/users/admin-users/admin-users.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminMenuComponent } from './components/menu/admin-menu/admin-menu.component';
import { AngularMaterialModule } from '../angular-material.module';
import { ProductDialogComponent } from './components/products/product-dialog/product-dialog.component';
import { UserDialogComponent } from './components/users/user-dialog/user-dialog.component';
import { DashboardComponent } from './components/menu/dashboard/dashboard.component';
import { AdminUsersService } from './services/admin-users.service';
import { AdminProductsService } from './services/admin-products.service';
import { CategoriesService } from '../shared/services/categories.service';
import { PasswordDialogComponent } from './components/users/password-dialog/password-dialog.component';

@NgModule({
  declarations: [
    AdminProductsComponent,
    AdminUsersComponent,
    AdminMenuComponent,
    ProductDialogComponent,
    UserDialogComponent,
    DashboardComponent,
    PasswordDialogComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [AdminUsersService, AdminProductsService, CategoriesService],
})
export class AdminModule {}
