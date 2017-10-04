import { TestBed, inject } from '@angular/core/testing';

import { PostcodeEpcService } from './postcode-epc.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('PostcodeEpcService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostcodeEpcService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([PostcodeEpcService], (service: PostcodeEpcService) => {
    expect(service).toBeTruthy();
  }));
});
