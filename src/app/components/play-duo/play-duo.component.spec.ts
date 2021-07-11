import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PlayDuoComponent} from './play-duo.component';

describe('PlayDuoComponent', () => {
  let component: PlayDuoComponent;
  let fixture: ComponentFixture<PlayDuoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayDuoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayDuoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
