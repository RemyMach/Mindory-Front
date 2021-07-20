import {Component, OnInit} from '@angular/core';
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
  textCardA: string;
  textCardB: string;
  imageCardA: Blob;
  imageCardB: Blob;

  constructor(
    public listDeckService: ListDeckService,
    private activatedRoute: ActivatedRoute,
    private snackBarService: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.listDeckService.getDeck(this.activatedRoute.snapshot.params.deckId);
  }

  getPairs(): void {
    this.pairs = [];
    for (const card of this.listDeckService.deck.Cards) {
      const match = this.pairs.filter(pair => pair.cards.filter(c => c.id === card.id).length > 0);
      if (match.length === 0 && card.cardAssociate !== undefined && card.cardAssociate !== null) {
        this.pairs.push(new Pair(card, card.cardAssociate));
      }
    }
  }
  loadImageA(event): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
          console.log(event.target);
          this.imageCardA = event.target.files[0];
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  loadImageB(event): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        console.log(event.target);
        this.imageCardB = event.target.files[0];
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  addPair(): void {
    console.log(this.textCardA);
    console.log(this.textCardB);
    console.log(this.imageCardA);
    console.log(this.imageCardB);
    if ((this.textCardA === undefined && this.imageCardA === undefined) || (this.textCardB === undefined && this.imageCardB === undefined)){
      this.snackBarService.openSnackBar('Merci de remplir les deux champs pour ajouter une carte', 'OK', 'Error');
      return;
    }
    this.listDeckService.createCards(this.textCardA, this.imageCardA, this.textCardB, this.imageCardB);
  }
  deletePair(pair: Pair): void {
    this.listDeckService.deleteCards(pair.cards);
  }
}
