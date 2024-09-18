import { TestBed, inject } from '@angular/core/testing';

import { InBodyService } from './inbody.service';

describe('InBodyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InBodyService]
    });
  });

  it('should be created', inject([InBodyService], (service: InBodyService) => {
    expect(service).toBeTruthy();
  }));
});
