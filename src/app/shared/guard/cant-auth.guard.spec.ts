import { TestBed } from '@angular/core/testing';

import { CantAuthGuard } from './cant-auth.guard';

describe('CantAuthGuard', () => {
  let guard: CantAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CantAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
