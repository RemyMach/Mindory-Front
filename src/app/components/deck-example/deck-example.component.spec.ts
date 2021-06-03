import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckExampleComponent } from './deck-example.component';

describe('DeckExampleComponent', () => {
  let component: DeckExampleComponent;
  let fixture: ComponentFixture<DeckExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeckExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
