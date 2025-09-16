import { TestBed } from '@angular/core/testing';

import { RemoveCartItemService } from './remove-cart-item.service';

describe('RemoveCartItemService', () => {
  let service: RemoveCartItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoveCartItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
