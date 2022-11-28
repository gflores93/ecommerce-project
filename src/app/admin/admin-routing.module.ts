import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../auth/services/admin-guard.service';
import { AdminCategoriesComponent } from './components/categories/admin-categories/admin-categories.component';
import { AdminMenuComponent } from './components/menu/admin-menu/admin-menu.component';
import { DashboardComponent } from './components/menu/dashboard/dashboard.component';
import { AdminProductsComponent } from './components/products/admin-products/admin-products.component';
import { AdminUsersComponent } from './components/users/admin-users/admin-users.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AdminGuard],
    component: AdminMenuComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'users',
        canActivate: [AdminGuard],
        component: AdminUsersComponent
      },
      {
        path: 'products',
        canActivate: [AdminGuard],
        component: AdminProductsComponent
      },
      {
        path: 'dashboard',
        canActivate: [AdminGuard],
        component: DashboardComponent
      },
      {
        path: 'categories',
        canActivate: [AdminGuard],
        component: AdminCategoriesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
