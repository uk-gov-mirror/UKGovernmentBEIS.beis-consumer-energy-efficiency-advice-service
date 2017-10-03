import { TestBed, inject } from '@angular/core/testing';

import { PostcodeEpcService } from './postcode-epc.service';

describe('PostcodeEpcService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostcodeEpcService]
    });
  });

  it('should be created', inject([PostcodeEpcService], (service: PostcodeEpcService) => {
    expect(service).toBeTruthy();
  }));
});
