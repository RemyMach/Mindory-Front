import { TestBed } from '@angular/core/testing';

import { UserNoSessionGuard } from './user-no-session.guard';

describe('UserNoSessionGuard', () => {
  let guard: UserNoSessionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserNoSessionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
