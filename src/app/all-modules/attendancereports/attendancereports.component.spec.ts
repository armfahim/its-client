import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendancereportsComponent } from './attendancereports.component';

describe('AttendancereportsComponent', () => {
  let component: AttendancereportsComponent;
  let fixture: ComponentFixture<AttendancereportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendancereportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendancereportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
