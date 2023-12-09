import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentcandidateListComponent } from './studentcandidate-list.component';

describe('StudentcandidateListComponent', () => {
  let component: StudentcandidateListComponent;
  let fixture: ComponentFixture<StudentcandidateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentcandidateListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentcandidateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
