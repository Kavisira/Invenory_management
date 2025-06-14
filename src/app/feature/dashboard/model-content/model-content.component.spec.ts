import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelContentComponent } from './model-content.component';

describe('ModelContentComponent', () => {
  let component: ModelContentComponent;
  let fixture: ComponentFixture<ModelContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
