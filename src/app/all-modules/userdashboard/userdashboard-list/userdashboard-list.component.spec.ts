import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdashboardListComponent } from './userdashboard-list.component';

describe('UserdashboardListComponent', () => {
  let component: UserdashboardListComponent;
  let fixture: ComponentFixture<UserdashboardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserdashboardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserdashboardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
