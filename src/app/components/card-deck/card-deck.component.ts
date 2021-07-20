import {Component, Input, OnInit} from '@angular/core';
import {Deck} from '../../models/deck.model';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../services/local-storage.service';
import {PlayDuoService} from '../../services/play/play-duo.service';

@Component({
  selector: 'app-card-deck',
  templateUrl: './card-deck.component.html',
  styleUrls: ['./card-deck.component.css']
})

export class CardDeckComponent implements OnInit {
  @Input() deck: Deck;
  constructor(
    public router: Router,
    private localStorageService: LocalStorageService,
    private playDuoService: PlayDuoService
  ) { }

  ngOnInit(): void {}

  public handleDeckClick(): void {
    this.localStorageService.updateLocalStorageAttributes();
    console.log(this.localStorageService.getParamGame());
    console.log(Date.now() - this.localStorageService.getParamGame().time);

    if (this.localStorageService.getParamGame() !== null && Date.now() - this.localStorageService.getParamGame().time <= 10000 && this.localStorageService.getParamGame().mode) {
      console.log(this.localStorageService.getParamGame().mode);
      if (this.localStorageService.getParamGame().mode === 'solo') {
        this.router.navigate([`play/solo/decks/${this.deck.id}`]);
      }else if (this.localStorageService.getParamGame().mode === 'duo') {
        console.log(this.localStorageService.getParamGame().link);
        if (this.localStorageService.getParamGame().link !== null && this.localStorageService.getParamGame().link === 'create') {
          this.playDuoService.createRoom(this.deck.id);
          this.router.navigate(['play/create']);
        }else {
          this.router.navigate(['play/duo/link']);
        }
      }
    }else {
      this.localStorageService.setParamGame({deckId: this.deck.id, time: Date.now()});
      this.router.navigate([`play/solo/decks/${this.deck.id}`]);
    }
  }
}
