import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseralljobsListComponent } from './useralljobs-list.component';

describe('UseralljobsListComponent', () => {
  let component: UseralljobsListComponent;
  let fixture: ComponentFixture<UseralljobsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseralljobsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseralljobsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
