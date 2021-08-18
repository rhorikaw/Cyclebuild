import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartImageComponent } from './part-image.component';

describe('PartImageComponent', () => {
  let component: PartImageComponent;
  let fixture: ComponentFixture<PartImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
