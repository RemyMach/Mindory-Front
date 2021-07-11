import {ComponentFixture, TestBed} from '@angular/core/testing';

import {JoinPartComponent} from './join-part.component';

describe('JoinPartComponent', () => {
  let component: JoinPartComponent;
  let fixture: ComponentFixture<JoinPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
