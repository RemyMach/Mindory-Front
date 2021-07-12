import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BannerPlayComponent} from './banner-play.component';

describe('BannerPlayComponent', () => {
  let component: BannerPlayComponent;
  let fixture: ComponentFixture<BannerPlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerPlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
