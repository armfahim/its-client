import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedjobsComponent } from './archivedjobs.component';

describe('ArchivedjobsComponent', () => {
  let component: ArchivedjobsComponent;
  let fixture: ComponentFixture<ArchivedjobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedjobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedjobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
