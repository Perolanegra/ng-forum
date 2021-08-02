import { TestBed } from '@angular/core/testing';

import { ReleaseFeatureToggleService } from './release-feature-toggle.service';

describe('ReleaseFeatureToggleService', () => {
  let service: ReleaseFeatureToggleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReleaseFeatureToggleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
