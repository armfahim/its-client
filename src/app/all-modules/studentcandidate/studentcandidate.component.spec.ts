import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentcandidateComponent } from './studentcandidate.component';

describe('StudentcandidateComponent', () => {
  let component: StudentcandidateComponent;
  let fixture: ComponentFixture<StudentcandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentcandidateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentcandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
