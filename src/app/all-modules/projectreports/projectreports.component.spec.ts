import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectreportsComponent } from './projectreports.component';

describe('ProjectreportsComponent', () => {
  let component: ProjectreportsComponent;
  let fixture: ComponentFixture<ProjectreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectreportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
