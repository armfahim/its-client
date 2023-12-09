import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetrevenuesListComponent } from './budgetrevenues-list.component';

describe('BudgetrevenuesListComponent', () => {
  let component: BudgetrevenuesListComponent;
  let fixture: ComponentFixture<BudgetrevenuesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetrevenuesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetrevenuesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
