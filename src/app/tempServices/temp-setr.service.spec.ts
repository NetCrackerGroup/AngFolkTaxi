import { TestBed } from '@angular/core/testing';

import { TempSetrService } from './temp-setr.service';

describe('TempSetrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TempSetrService = TestBed.get(TempSetrService);
    expect(service).toBeTruthy();
  });
});
