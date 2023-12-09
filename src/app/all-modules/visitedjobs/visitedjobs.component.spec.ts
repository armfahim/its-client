import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitedjobsComponent } from './visitedjobs.component';

describe('VisitedjobsComponent', () => {
  let component: VisitedjobsComponent;
  let fixture: ComponentFixture<VisitedjobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitedjobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitedjobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
