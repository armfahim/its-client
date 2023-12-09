import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserreportsListComponent } from './userreports-list.component';

describe('UserreportsListComponent', () => {
  let component: UserreportsListComponent;
  let fixture: ComponentFixture<UserreportsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserreportsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserreportsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
