import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseralljobsComponent } from './useralljobs.component';

describe('UseralljobsComponent', () => {
  let component: UseralljobsComponent;
  let fixture: ComponentFixture<UseralljobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseralljobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseralljobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
