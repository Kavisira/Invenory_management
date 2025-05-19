import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-modal-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    NgIf,
    MatButtonModule
  ],
  templateUrl: './add-modal-dialog.component.html',
  styleUrl: './add-modal-dialog.component.scss',
})
export class AddModalDialogComponent {
  addDataform: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.addDataform = this.formBuilder.group({
      category: ['', Validators.required],
      type: ['', Validators.required],
      description: [''],
    });
  }

  onSubmit() {
    console.log('submit');
  }

  onCancel() {
    console.log('cancel');
  }
}
