import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetexpensesComponent } from './budgetexpenses.component';

describe('BudgetexpensesComponent', () => {
  let component: BudgetexpensesComponent;
  let fixture: ComponentFixture<BudgetexpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetexpensesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetexpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
