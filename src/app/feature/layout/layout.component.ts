import { Component, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { StatusModalComponent } from '../dashboard/status-modal/status-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { MatDatepicker, MatDatepickerInput, MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MatOption, MatSelect, MatSelectModule } from '@angular/material/select';
import { MatInput, MatInputModule } from '@angular/material/input';
const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MMMM YYYY',
  },
  display: {
    dateInput: 'MMMM YYYY',        // Input box shows "May 2025"
    monthYearLabel: 'MMMM YYYY',   // Dropdown label
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
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
    NgFor,
    NgStyle,
    MatFormFieldModule,
      MatDatepickerInput,
    MatDatepickerToggle,
    MatSelect,
    MatDatepickerModule,
    FormsModule,
    MatOption,
    MatInputModule,
    ReactiveFormsModule,
    NgIf
],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  providers: [
    { provide: MatDatepickerInput, useValue: MY_FORMATS },
    { provide: MatDatepickerToggle, useValue: MY_FORMATS },
    provideMomentDateAdapter(MY_FORMATS)
  ]
})
export class LayoutComponent {
    readonly date = new FormControl(moment());
    readonly dialog = inject(MatDialog);
      filterOptions = ['All', '', '', 'Custom'];
  selectedOption: string = 'All';
  monthControl = new FormControl<Date | null>(null);
  opened = true;
  routerpath: string = '';
    today = new Date();

  customMonth: Date | null = null;
  menuItems = [
    { name: 'Dashboard', path: '/dashboard', match:'dashboard', icon: 'dashboard' },
    { name: 'Category', path: '/category', match:'category', icon: 'category' },
    { name: 'Types', path: '/types',match:'types', icon: 'text_fields' },
    { name: 'Entries', path: '/entries',match:'entries', icon: 'type_specimen' },
    
  ];
  constructor() {
        this.generateMonthOptions();
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

    openPopup() {
      this.dialog.open(StatusModalComponent).afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
  
    closePopup() {    }

     disableFutureDates = (d: Date | null): boolean => {
    const now = new Date();
    return d ? d <= now : false;
  };
  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value ?? moment();
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }
 generateMonthOptions() {
    const now = new Date();
    const currentMonth = now.toLocaleString('default', { month: 'long' });
    const currentYear = now.getFullYear();

    const prevDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const prevMonth = prevDate.toLocaleString('default', { month: 'long' });
    const prevYear = prevDate.getFullYear();

    this.filterOptions[1] = `${currentMonth} ${currentYear}`;
    this.filterOptions[2] = `${prevMonth} ${prevYear}`;
  }
  onFilterChange(option: string) {
    if (option !== 'Custom') {
      this.customMonth = null;
    }
  }
}
