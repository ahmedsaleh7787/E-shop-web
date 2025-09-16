import { TestBed } from '@angular/core/testing';

import { GetCartFromApiService } from './get-cart-from-api.service';

describe('GetCartFromApiService', () => {
  let service: GetCartFromApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCartFromApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
