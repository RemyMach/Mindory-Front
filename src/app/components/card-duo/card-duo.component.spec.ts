import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CardDuoComponent} from './card-duo.component';

describe('CardDuoComponent', () => {
  let component: CardDuoComponent;
  let fixture: ComponentFixture<CardDuoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardDuoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDuoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
