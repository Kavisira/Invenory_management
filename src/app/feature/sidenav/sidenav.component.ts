import { NgIf, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { ToggleService } from '../../core/services/toggle.service';

@Component({
  selector: 'app-sidenav',
  imports: [
       MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    RouterModule,
    NgClass,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  opened = true;
  routerpath: string = '';
  constructor(private toggleService: ToggleService) {
  }
ngOnInit() {
    this.toggleService.sidebarOpen$.subscribe(open => {
      console.log('sidebar dfdfdf Open', open);
      this.opened = open;
    });
}
 logout() {
    localStorage.clear();
    location.href = '/login';
  }
}
