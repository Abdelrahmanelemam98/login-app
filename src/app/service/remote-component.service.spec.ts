import { TestBed } from '@angular/core/testing';

import { RemoteComponentService } from './remote-component.service';

describe('RemoteComponentService', () => {
  let service: RemoteComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoteComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
