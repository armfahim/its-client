import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftSchedulingComponent } from './shift-scheduling.component';

describe('ShiftSchedulingComponent', () => {
  let component: ShiftSchedulingComponent;
  let fixture: ComponentFixture<ShiftSchedulingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftSchedulingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftSchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
