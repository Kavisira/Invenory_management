import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { BarVerticalComponent, NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepicker, MatDatepickerInput, MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import * as _moment from 'moment';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { default as _rollupMoment, Moment } from 'moment';
import { MatIconModule } from '@angular/material/icon';
const moment = _rollupMoment || _moment;
import { ModelContentComponent } from './model-content/model-content.component';
import { StatusModalComponent } from './status-modal/status-modal.component';
import { MatButtonModule } from '@angular/material/button';


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
    MatIconModule, MatDialogModule,MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: []
})
export class DashboardComponent {
  readonly dialog = inject(MatDialog);
  filterOptions = ['All', '', '', 'Custom'];
  selectedOption: string = 'All';
  monthControl = new FormControl<Date | null>(null);
  today = new Date();

  customMonth: Date | null = null;
  single: any[] = [
    {
      "name": "Food",
      "value": 500
    },
    {
      "name": "Entertainment",
      "value": 600
    },
    {
      "name": "Debts",
      "value": 7200
    },
    {
      "name": "Housing",
      "value": 300
    },
    {
      "name": "Transportation",
      "value": 100
    },
    {
      "name": "Health",
      "value": 250
    },
    {
      "name": "Clothing",
      "value": 700
    },
    {
      "name": "Education",
      "value": 500
    }
  ];
  pieChartData: any[] = [
    {
      "name": "Expenses",
      "value": 500
    },
    {
      "name": "Debts",
      "value": 600
    },
    {
      "name": "Savings",
      "value": 7200
    },
    {
      "name": "Investments",
      "value": 300
    }
  ];
  multi: any[] = [];

  view: [number, number] = [500, 200];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Categories';
  showYAxisLabel = true;
  yAxisLabel = 'Amount';
  showLabels = true;
  animations = true;
  colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#FF8C00', '#FF4500', '#FF6347', '#FF1493']
  };
  chartWidth = 0;
  chartHeight = 0;
  isDoughnut: boolean = false;
  showPopup: boolean = false;
  @ViewChild('chartContainer') chartContainer!: ElementRef;
  constructor() {
    Object.assign(this, { single: this.single })
    Object.assign(this, { pieChartData: this.pieChartData })
    this.generateMonthOptions();
  }
  ngAfterViewInit() {
    this.updateChartSize();
    window.addEventListener('resize', () => this.updateChartSize());
  }

  updateChartSize() {
    const container = this.chartContainer.nativeElement;
    this.chartWidth = container.offsetWidth;
    this.chartHeight = container.offsetHeight;
  }

  openDialog(currentData: any) {
    this.dialog.open(ModelContentComponent, {
      data:currentData,
    }).afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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

  onSelect(event: any) {
    console.log(event);
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

  openPopup() {
    this.dialog.open(StatusModalComponent).afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  closePopup() {
    this.showPopup = false;
  }

  onSelectChartType(currentData: any) {
    console.log('Chart type changed:', currentData);
    this.openDialog(currentData);
  }

  openAddTransactionPopup() {}

}
