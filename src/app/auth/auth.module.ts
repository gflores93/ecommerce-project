import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';
import { MainGuard } from './services/main-guard.service';
import { AdminGuard } from './services/admin-guard.service';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [CommonModule, AuthRoutingModule, FormsModule, ReactiveFormsModule],
  exports: [LoginComponent, RegisterComponent],
  providers: [AuthService, MainGuard, AdminGuard],
})
export class AuthModule {}
