import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayslipreportsListComponent } from './payslipreports-list.component';

describe('PayslipreportsListComponent', () => {
  let component: PayslipreportsListComponent;
  let fixture: ComponentFixture<PayslipreportsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayslipreportsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayslipreportsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
