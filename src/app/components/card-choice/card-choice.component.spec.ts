import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CardChoiceComponent} from './card-choice.component';

describe('CardChoiceComponent', () => {
  let component: CardChoiceComponent;
  let fixture: ComponentFixture<CardChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardChoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
