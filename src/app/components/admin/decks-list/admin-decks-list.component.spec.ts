import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminDecksListComponent} from './admin-decks-list.component';

describe('AdminDecksListComponent', () => {
  let component: AdminDecksListComponent;
  let fixture: ComponentFixture<AdminDecksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDecksListComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDecksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
