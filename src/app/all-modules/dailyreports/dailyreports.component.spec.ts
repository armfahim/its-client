import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyreportsComponent } from './dailyreports.component';

describe('DailyreportsComponent', () => {
  let component: DailyreportsComponent;
  let fixture: ComponentFixture<DailyreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyreportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
