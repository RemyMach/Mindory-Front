import {Component, OnInit} from '@angular/core';
import {ListDeckService} from '../../../services/mindory-api/deck/list-deck.service';

@Component({
  selector: 'app-admin-decks-tab',
  templateUrl: './admin-decks-tab.component.html',
  styleUrls: ['./admin-decks-tab.component.css']
})
export class AdminDecksTabComponent implements OnInit {
  constructor(
    public listDeckService: ListDeckService
  ) { }

  ngOnInit(): void {
    this.listDeckService.getAllDecks(0, 24);
  }
}
