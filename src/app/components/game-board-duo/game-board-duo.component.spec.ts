import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameBoardDuoComponent } from './game-board-duo.component';

describe('GameBoardDuoComponent', () => {
  let component: GameBoardDuoComponent;
  let fixture: ComponentFixture<GameBoardDuoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameBoardDuoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameBoardDuoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
