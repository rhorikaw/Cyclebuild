import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartAddConfirmationComponent } from './part-add-confirmation.component';

describe('PartAddConfirmationComponent', () => {
  let component: PartAddConfirmationComponent;
  let fixture: ComponentFixture<PartAddConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartAddConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartAddConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
