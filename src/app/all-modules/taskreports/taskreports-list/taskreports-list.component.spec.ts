import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskreportsListComponent } from './taskreports-list.component';

describe('TaskreportsListComponent', () => {
  let component: TaskreportsListComponent;
  let fixture: ComponentFixture<TaskreportsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskreportsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskreportsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
