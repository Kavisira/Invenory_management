import { Routes } from '@angular/router';
import { AuthGuard } from './core/services/auth-guard';
import { LoginComponent } from './feature/login/login.component';
import { DashboardComponent } from './feature/dashboard/dashboard.component';
import { LayoutComponent } from './feature/layout/layout.component';
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LayoutComponent, canActivate: [AuthGuard], children: [
    { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'category', loadComponent: () => import('./feature/category/category.component').then(m => m.CategoryComponent), canActivate: [AuthGuard] },
    { path: 'types', loadComponent: () => import('./feature/types/types.component').then(m => m.TypesComponent), canActivate: [AuthGuard] },
    { path: 'entries', loadComponent: () => import('./feature/entries/entries.component').then(m => m.EntriesComponent), canActivate: [AuthGuard] }
  ]},
  { path: '**', redirectTo: 'login' }
];
