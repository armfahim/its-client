import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferedjobsComponent } from './offeredjobs.component';

describe('OfferedjobsComponent', () => {
  let component: OfferedjobsComponent;
  let fixture: ComponentFixture<OfferedjobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferedjobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferedjobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
