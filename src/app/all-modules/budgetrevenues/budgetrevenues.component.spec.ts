import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetrevenuesComponent } from './budgetrevenues.component';

describe('BudgetrevenuesComponent', () => {
  let component: BudgetrevenuesComponent;
  let fixture: ComponentFixture<BudgetrevenuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetrevenuesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetrevenuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
