import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeereportsListComponent } from './employeereports-list.component';

describe('EmployeereportsListComponent', () => {
  let component: EmployeereportsListComponent;
  let fixture: ComponentFixture<EmployeereportsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeereportsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeereportsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
