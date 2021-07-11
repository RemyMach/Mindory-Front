import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDecksTabComponent } from './admin-decks-tab.component';

describe('AdminDecksTabComponent', () => {
  let component: AdminDecksTabComponent;
  let fixture: ComponentFixture<AdminDecksTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDecksTabComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDecksTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
