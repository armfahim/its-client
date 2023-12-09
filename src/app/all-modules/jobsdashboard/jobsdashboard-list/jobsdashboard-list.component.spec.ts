import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsdashboardListComponent } from './jobsdashboard-list.component';

describe('JobsdashboardListComponent', () => {
  let component: JobsdashboardListComponent;
  let fixture: ComponentFixture<JobsdashboardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobsdashboardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsdashboardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
