import { TestBed } from '@angular/core/testing';

import { AppsServiceService } from './apps-service.service';

describe('AppsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppsServiceService = TestBed.get(AppsServiceService);
    expect(service).toBeTruthy();
  });
});
