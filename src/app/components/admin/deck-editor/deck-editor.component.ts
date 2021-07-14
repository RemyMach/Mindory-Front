import { Component, OnInit } from '@angular/core';
import {ListDeckService} from '../../../services/mindory-api/deck/list-deck.service';
import {ActivatedRoute} from '@angular/router';
import {Card} from '../../../models/card.model';
import {SnackbarService} from '../../../services/snackbar.service';

export class Pair {
  cards: Card[];

  constructor(a: Card, b: Card) {
    this.cards = [a, b];
  }
}

@Component({
  selector: 'app-deck-editor',
  templateUrl: './deck-editor.component.html',
  styleUrls: ['./deck-editor.component.css']
})
export class DeckEditorComponent implements OnInit {
  pairs: Pair[];
  newCardA: string;
  newCardB: string;

  constructor(
    public listDeckService: ListDeckService,
    private activatedRoute: ActivatedRoute,
    private snackBarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.listDeckService.getDeck(this.activatedRoute.snapshot.params.deckId);
  }

  getPairs(): void {
    console.log(this.listDeckService.deck);
    this.pairs = [];
    for (const card of this.listDeckService.deck.Cards) {
      const match = this.pairs.filter(pair => pair.cards.filter(c => c.id === card.id).length > 0);
      if (match.length === 0 && card.cardAssociate !== undefined && card.cardAssociate !== null) {
        this.pairs.push(new Pair(card, card.cardAssociate));
      }
    }
    console.log(this.pairs);
  }
  addPair(): void {
    console.log(this.newCardA);
    console.log(this.newCardB);
    if (this.newCardA === undefined || this.newCardB === undefined) {
      this.snackBarService.openSnackBar('Merci de remplir les deux champs pour ajouter une carte', 'OK', 'Error');
      return;
    }
  }
  deletePair(pair: Pair): void {
    this.listDeckService.deleteCards(pair.cards);
  }
}
