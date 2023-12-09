import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduletimingComponent } from './scheduletiming.component';

describe('ScheduletimingComponent', () => {
  let component: ScheduletimingComponent;
  let fixture: ComponentFixture<ScheduletimingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduletimingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduletimingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
