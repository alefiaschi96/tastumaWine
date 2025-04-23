import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WineListComponent } from './wine-list/wine-list.component';
import { WineNewComponent } from './wine-new/wine-new.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { PermissionGuard } from './auth/permission.guard';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'wine-list', component: WineListComponent, canActivate: [AuthGuard] },
  { path: 'wine', component: WineNewComponent, canActivate: [AuthGuard, PermissionGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard, PermissionGuard] },
  { path: '', redirectTo: 'wine-list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled',  useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }