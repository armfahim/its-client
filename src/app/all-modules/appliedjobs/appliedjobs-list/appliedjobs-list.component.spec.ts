import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedjobsListComponent } from './appliedjobs-list.component';

describe('AppliedjobsListComponent', () => {
  let component: AppliedjobsListComponent;
  let fixture: ComponentFixture<AppliedjobsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppliedjobsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliedjobsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
