import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AptituteListComponent } from './aptitute-list.component';

describe('AptituteListComponent', () => {
  let component: AptituteListComponent;
  let fixture: ComponentFixture<AptituteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AptituteListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AptituteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
