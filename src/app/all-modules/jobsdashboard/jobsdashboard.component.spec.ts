import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsdashboardComponent } from './jobsdashboard.component';

describe('JobsdashboardComponent', () => {
  let component: JobsdashboardComponent;
  let fixture: ComponentFixture<JobsdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobsdashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
