import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedjobsListComponent } from './archivedjobs-list.component';

describe('ArchivedjobsListComponent', () => {
  let component: ArchivedjobsListComponent;
  let fixture: ComponentFixture<ArchivedjobsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedjobsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedjobsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
