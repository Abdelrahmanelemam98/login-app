import { TestBed } from '@angular/core/testing';

import { GlobalerrorService } from './globalerror.service';

describe('GlobalerrorService', () => {
  let service: GlobalerrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalerrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
