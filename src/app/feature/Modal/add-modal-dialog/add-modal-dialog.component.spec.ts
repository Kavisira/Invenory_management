import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModalDialogComponent } from './add-modal-dialog.component';

describe('AddModalDialogComponent', () => {
  let component: AddModalDialogComponent;
  let fixture: ComponentFixture<AddModalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddModalDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
