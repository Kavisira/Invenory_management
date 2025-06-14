import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-status-modal',
  imports: [MatDialogModule, NgClass, MatButtonModule],
  templateUrl: './status-modal.component.html',
  styleUrl: './status-modal.component.scss'
})
export class StatusModalComponent {
className: string = 'surplus';
}
