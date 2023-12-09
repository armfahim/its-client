import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyreportsListComponent } from './dailyreports-list.component';

describe('DailyreportsListComponent', () => {
  let component: DailyreportsListComponent;
  let fixture: ComponentFixture<DailyreportsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyreportsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyreportsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
