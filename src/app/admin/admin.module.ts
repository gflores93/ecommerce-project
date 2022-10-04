import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';
import { AngularMaterialModule } from '../angular-material.module';
import { DialogComponent } from './components/dialog/dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';

@NgModule({
  declarations: [
    AdminProductsComponent,
    AdminUsersComponent,
    AdminMenuComponent,
    DialogComponent,
    UserDialogComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class AdminModule {}
