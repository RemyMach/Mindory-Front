import {Component, OnInit} from '@angular/core';
import {ListDeckService} from '../../../services/mindory-api/deck/list-deck.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-decks-tab',
  templateUrl: './admin-decks-tab.component.html',
  styleUrls: ['./admin-decks-tab.component.css']
})
export class AdminDecksTabComponent implements OnInit {
  constructor(
    public listDeckService: ListDeckService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listDeckService.getAllDecks(0, 24);
  }
  public handleDeckClick(deckId: number): void {
    this.router.navigate(['admin/deck/' + deckId]);
  }
  public deleteDeck(deckId: number): void {
    this.listDeckService.deleteDeck(deckId);
  }
}
