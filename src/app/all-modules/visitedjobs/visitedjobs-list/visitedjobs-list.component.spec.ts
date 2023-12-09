import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitedjobsListComponent } from './visitedjobs-list.component';

describe('VisitedjobsListComponent', () => {
  let component: VisitedjobsListComponent;
  let fixture: ComponentFixture<VisitedjobsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitedjobsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitedjobsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
