import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskreportsComponent } from './taskreports.component';

describe('TaskreportsComponent', () => {
  let component: TaskreportsComponent;
  let fixture: ComponentFixture<TaskreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskreportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
