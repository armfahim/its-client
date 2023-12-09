import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewingComponent } from './interviewing.component';

describe('InterviewingComponent', () => {
  let component: InterviewingComponent;
  let fixture: ComponentFixture<InterviewingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
