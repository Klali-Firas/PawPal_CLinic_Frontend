import { TestBed } from '@angular/core/testing';

import { ServiceanimauxService } from './serviceanimaux.service';

describe('ServiceanimauxService', () => {
  let service: ServiceanimauxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceanimauxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
