import { TestBed, inject } from '@angular/core/testing';

import { InputsService } from './inputs.service';

describe('InputsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InputsService]
    });
  });

  it('should be created', inject([InputsService], (service: InputsService) => {
    expect(service).toBeTruthy();
  }));
});
