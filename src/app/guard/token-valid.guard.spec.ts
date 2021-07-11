import { TestBed } from '@angular/core/testing';

import { TokenValidGuard } from './token-valid.guard';

describe('TokenValidGuard', () => {
  let guard: TokenValidGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TokenValidGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
