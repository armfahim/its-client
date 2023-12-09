import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferedjobsListComponent } from './offeredjobs-list.component';

describe('OfferedjobsListComponent', () => {
  let component: OfferedjobsListComponent;
  let fixture: ComponentFixture<OfferedjobsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferedjobsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferedjobsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
