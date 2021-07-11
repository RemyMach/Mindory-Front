import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayModeComponent } from './play-mode.component';

describe('PlayModeComponent', () => {
  let component: PlayModeComponent;
  let fixture: ComponentFixture<PlayModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayModeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
