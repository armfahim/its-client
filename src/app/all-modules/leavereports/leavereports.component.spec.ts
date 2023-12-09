import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavereportsComponent } from './leavereports.component';

describe('LeavereportsComponent', () => {
  let component: LeavereportsComponent;
  let fixture: ComponentFixture<LeavereportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeavereportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeavereportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
