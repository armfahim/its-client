import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokboxComponent } from './tokbox.component';

describe('TokboxComponent', () => {
  let component: TokboxComponent;
  let fixture: ComponentFixture<TokboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
