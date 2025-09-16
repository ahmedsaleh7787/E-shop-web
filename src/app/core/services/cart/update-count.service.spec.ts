import { TestBed } from '@angular/core/testing';

import { UpdateCountService } from './update-count.service';

describe('UpdateCountService', () => {
  let service: UpdateCountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateCountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
