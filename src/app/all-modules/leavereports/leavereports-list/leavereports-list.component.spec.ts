import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavereportsListComponent } from './leavereports-list.component';

describe('LeavereportsListComponent', () => {
  let component: LeavereportsListComponent;
  let fixture: ComponentFixture<LeavereportsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeavereportsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeavereportsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
