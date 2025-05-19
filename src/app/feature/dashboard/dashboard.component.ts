import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepicker, MatDatepickerInput, MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
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
  selector: 'app-dashboard-component',
  standalone: true,
  imports: [ 
    NgxChartsModule,
    MatCardModule,
    MatGridListModule,
    CommonModule,
    MatFormFieldModule, 
    MatSelectModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MatDatepickerModule,
   MatNativeDateModule,
   MatInputModule,
  MatDatepickerInput ,MatDatepickerToggle  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [   provideMomentDateAdapter(MY_FORMATS),]
})
export class DashboardComponent {
  view: [number, number] = [500, 200];
  filterOptions = ['All', '', '', 'Custom'];
  selectedOption: string = 'All';
   monthControl = new FormControl<Date | null>(null);
  today = new Date();

  customMonth: Date | null = null;

  // Sample data
  single = [
    {
      name: 'Income',
      value: 894000,
    },
    {
      name: 'Overall Expenses',
      value: 800000,
    },
    {
      name: 'Savings',
      value: 94000,
    },
  ];

  constructor() {
    this.generateMonthOptions();
  }


  // Options
  showLegend = true;
  showLabels = true;
  animations = true;
  
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



  // Optional: prevent selecting future months
  disableFutureDates = (d: Date | null): boolean => {
    const now = new Date();
    return d ? d <= now : false;
  };

  readonly date = new FormControl(moment());

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value ?? moment();
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

}
