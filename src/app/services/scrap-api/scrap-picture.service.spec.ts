import { TestBed } from '@angular/core/testing';

import { ScrapPictureService } from './scrap-picture.service';

describe('ScrapPictureService', () => {
  let service: ScrapPictureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrapPictureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
