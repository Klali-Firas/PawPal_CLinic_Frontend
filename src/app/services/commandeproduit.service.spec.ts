import { TestBed } from '@angular/core/testing';

import { CommandeproduitService } from './commandeproduit.service';

describe('CommandeproduitService', () => {
  let service: CommandeproduitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommandeproduitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
