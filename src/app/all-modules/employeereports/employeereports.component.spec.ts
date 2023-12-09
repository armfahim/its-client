import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeereportsComponent } from './employeereports.component';

describe('EmployeereportsComponent', () => {
  let component: EmployeereportsComponent;
  let fixture: ComponentFixture<EmployeereportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeereportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeereportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
