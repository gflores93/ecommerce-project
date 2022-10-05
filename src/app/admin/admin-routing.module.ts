import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../auth/services/admin-guard.service';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AdminGuard],
    component: AdminMenuComponent,
    children: [
      {
        path: 'users',
        canActivate: [AdminGuard],
        component: AdminUsersComponent,
      },
      {
        path: 'products',
        canActivate: [AdminGuard],
        component: AdminProductsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
