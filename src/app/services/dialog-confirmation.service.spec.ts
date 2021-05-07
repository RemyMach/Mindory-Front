import { TestBed } from '@angular/core/testing';

import { DialogConfirmationService } from './dialog-confirmation.service';

describe('DialogConfirmationService', () => {
  let service: DialogConfirmationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogConfirmationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
