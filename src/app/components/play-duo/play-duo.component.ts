import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {PlayDuoService} from '../../services/play/play-duo.service';

@Component({
  selector: 'app-play-duo',
  templateUrl: './play-duo.component.html',
  styleUrls: ['./play-duo.component.css']
})
export class PlayDuoComponent implements OnInit {
  currentUrl: string;
  startGame = false;
  constructor(

    public router: Router,
    public route: ActivatedRoute,
    private playDuoService: PlayDuoService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {

    this.playDuoService.getActualDeck();
    this.currentUrl = this.router.url;
  }

  public refreshPage(): void {
    this.document.defaultView.location.reload();
  }

}
