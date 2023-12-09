import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewingListComponent } from './interviewing-list.component';

describe('InterviewingListComponent', () => {
  let component: InterviewingListComponent;
  let fixture: ComponentFixture<InterviewingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
