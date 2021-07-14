import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerPlayDuoComponent } from './banner-play-duo.component';

describe('BannerPlayDuoComponent', () => {
  let component: BannerPlayDuoComponent;
  let fixture: ComponentFixture<BannerPlayDuoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerPlayDuoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerPlayDuoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
