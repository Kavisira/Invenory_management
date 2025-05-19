import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    RouterModule,
    NgClass,
    NgFor
],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  opened = true;
  routerpath: string = '';
  menuItems = [
    { name: 'Dashboard', path: '/dashboard', match:'dashboard', icon: 'inventory' },
    { name: 'Category', path: '/category', match:'category', icon: 'category' },
    { name: 'Types', path: '/types',match:'types', icon: 'type_specimen' },
    { name: 'Entries', path: '/entries',match:'entries', icon: 'type_specimen' },
    
  ];
  constructor() {
  }

  logout() {
    localStorage.clear();
    location.href = '/login';
  }

  matchRoute(route: string) { 
    this.routerpath = location.pathname;
    this.routerpath = this.routerpath.split('/')[1];
    return this.routerpath === route;
  }
}
