import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PlayDuoChoiceLinkComponent} from './play-duo-choice-link.component';

describe('PlayDuoChoiceLinkComponent', () => {
  let component: PlayDuoChoiceLinkComponent;
  let fixture: ComponentFixture<PlayDuoChoiceLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayDuoChoiceLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayDuoChoiceLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
