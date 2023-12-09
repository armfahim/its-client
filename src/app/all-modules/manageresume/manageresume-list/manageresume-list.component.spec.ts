import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageresumeListComponent } from './manageresume-list.component';

describe('ManageresumeListComponent', () => {
  let component: ManageresumeListComponent;
  let fixture: ComponentFixture<ManageresumeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageresumeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageresumeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
