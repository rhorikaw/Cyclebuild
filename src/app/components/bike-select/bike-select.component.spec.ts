import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeSelectComponent } from './bike-select.component';

describe('BikeSelectComponent', () => {
  let component: BikeSelectComponent;
  let fixture: ComponentFixture<BikeSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BikeSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BikeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
