import {Component, Input, OnInit} from '@angular/core';
import {Deck} from '../../models/deck.model';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../services/local-storage.service';
import {RoomCreateService} from '../../services/mindory-api/room/room-create.service';
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

  ngOnInit(): void {
  }

  public handleDeckClick(): void {
    this.localStorageService.updateLocalStorageAttributes();
    if (this.localStorageService.paramGame !== null && Date.now() - this.localStorageService.paramGame.time >= 5000 && this.localStorageService.paramGame.mode) {
      if (this.localStorageService.paramGame.mode === 'solo') {
        this.router.navigate([`play/solo/decks/${this.deck.id}`]);
      }else if (this.localStorageService.paramGame.mode === 'duo') {
        if (this.localStorageService.paramGame.link !== null && this.localStorageService.paramGame.link === 'create') {
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
