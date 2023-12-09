import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageresumeComponent } from './manageresume.component';

describe('ManageresumeComponent', () => {
  let component: ManageresumeComponent;
  let fixture: ComponentFixture<ManageresumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageresumeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageresumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
