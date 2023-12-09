import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetexpensesListComponent } from './budgetexpenses-list.component';

describe('BudgetexpensesListComponent', () => {
  let component: BudgetexpensesListComponent;
  let fixture: ComponentFixture<BudgetexpensesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetexpensesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetexpensesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
