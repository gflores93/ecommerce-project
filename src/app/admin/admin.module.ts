import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminUsersService } from './services/admin-users.service';
import { AdminProductsService } from './services/admin-products.service';
import { CategoriesService } from '../shared/services/categories.service';

import { AdminMenuComponent } from './components/menu/admin-menu/admin-menu.component';
import { DashboardComponent } from './components/menu/dashboard/dashboard.component';
import { AdminUsersComponent } from './components/users/admin-users/admin-users.component';
import { AdminProductsComponent } from './components/products/admin-products/admin-products.component';
import { AdminCategoriesComponent } from './components/categories/admin-categories/admin-categories.component';
import { UserDialogComponent } from './components/users/user-dialog/user-dialog.component';
import { ProductDialogComponent } from './components/products/product-dialog/product-dialog.component';
import { PasswordDialogComponent } from './components/users/password-dialog/password-dialog.component';
import { CategoryDialogComponent } from './components/categories/category-dialog/category-dialog.component';

@NgModule({
  declarations: [
    AdminMenuComponent,
    DashboardComponent,
    AdminUsersComponent,
    AdminProductsComponent,
    AdminCategoriesComponent,
    UserDialogComponent,
    ProductDialogComponent,
    PasswordDialogComponent,
    CategoryDialogComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AdminUsersService, AdminProductsService, CategoriesService]
})
export class AdminModule {}
