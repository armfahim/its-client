import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedjobsComponent } from './savedjobs.component';

describe('SavedjobsComponent', () => {
  let component: SavedjobsComponent;
  let fixture: ComponentFixture<SavedjobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedjobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedjobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
