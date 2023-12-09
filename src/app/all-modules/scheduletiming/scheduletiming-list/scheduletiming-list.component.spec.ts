import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduletimingListComponent } from './scheduletiming-list.component';

describe('ScheduletimingListComponent', () => {
  let component: ScheduletimingListComponent;
  let fixture: ComponentFixture<ScheduletimingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduletimingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduletimingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
