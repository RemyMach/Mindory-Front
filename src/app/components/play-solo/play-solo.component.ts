import {Component, Inject, OnInit} from '@angular/core';
import {ListDeckCardsService} from '../../services/mindory-api/deck/list-deck-cards.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {PlaySoloService} from '../../services/play/play-solo.service';

@Component({
  selector: 'app-play-solo',
  templateUrl: './play-solo.component.html',
  styleUrls: ['./play-solo.component.css']
})
export class PlaySoloComponent implements OnInit {
  currentUrl: string;
  startGame = false;
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public playSoloService: PlaySoloService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    this.playSoloService.getDeck(this.route.snapshot.params.deckTitle);
    this.currentUrl = this.router.url;
  }

  public refreshPage(): void {
    this.document.defaultView.location.reload();
  }

}
