import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedjobsListComponent } from './savedjobs-list.component';

describe('SavedjobsListComponent', () => {
  let component: SavedjobsListComponent;
  let fixture: ComponentFixture<SavedjobsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedjobsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedjobsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
