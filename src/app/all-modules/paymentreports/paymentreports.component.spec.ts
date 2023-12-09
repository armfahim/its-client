import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentreportsComponent } from './paymentreports.component';

describe('PaymentreportsComponent', () => {
  let component: PaymentreportsComponent;
  let fixture: ComponentFixture<PaymentreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentreportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
