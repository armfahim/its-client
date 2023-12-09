import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentreportsListComponent } from './paymentreports-list.component';

describe('PaymentreportsListComponent', () => {
  let component: PaymentreportsListComponent;
  let fixture: ComponentFixture<PaymentreportsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentreportsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentreportsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
