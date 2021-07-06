import { Component, OnInit } from '@angular/core';
import {ListDeckService} from '../../services/mindory-api/deck/list-deck.service';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../services/local-storage.service';

@Component({
  selector: 'app-deck-example',
  templateUrl: './deck-example.component.html',
  styleUrls: ['./deck-example.component.css']
})
export class DeckExampleComponent implements OnInit {

  constructor(
    public router: Router,
    public listDeckService: ListDeckService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.listDeckService.getDecksFromHome();
  }

  public handleDeckClick(deckId: number): void {
    this.localStorageService.updateLocalStorageAttributes();
    console.log(this.localStorageService.paramGame);
    this.router.navigate([`play/solo/decks/${deckId}`]);
  }

}
