import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayDeckComponent } from './play-deck.component';

describe('PlayDeckComponent', () => {
  let component: PlayDeckComponent;
  let fixture: ComponentFixture<PlayDeckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayDeckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
