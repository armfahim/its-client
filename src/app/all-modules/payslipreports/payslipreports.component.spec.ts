import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayslipreportsComponent } from './payslipreports.component';

describe('PayslipreportsComponent', () => {
  let component: PayslipreportsComponent;
  let fixture: ComponentFixture<PayslipreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayslipreportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayslipreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
