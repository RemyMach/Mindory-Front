import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayDeckDuoComponent } from './play-deck-duo.component';

describe('PlayDeckDuoComponent', () => {
  let component: PlayDeckDuoComponent;
  let fixture: ComponentFixture<PlayDeckDuoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayDeckDuoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayDeckDuoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
