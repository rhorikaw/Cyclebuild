import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartExistsComponent } from './part-exists.component';

describe('PartExistsComponent', () => {
  let component: PartExistsComponent;
  let fixture: ComponentFixture<PartExistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartExistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartExistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
