import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendancereportsListComponent } from './attendancereports-list.component';

describe('AttendancereportsListComponent', () => {
  let component: AttendancereportsListComponent;
  let fixture: ComponentFixture<AttendancereportsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendancereportsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendancereportsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
