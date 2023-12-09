import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectreportsListComponent } from './projectreports-list.component';

describe('ProjectreportsListComponent', () => {
  let component: ProjectreportsListComponent;
  let fixture: ComponentFixture<ProjectreportsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectreportsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectreportsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
