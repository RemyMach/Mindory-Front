import { Component, OnInit } from '@angular/core';
import {ListDeckCardsService} from '../../services/mindory-api/deck/list-deck-cards.service';

@Component({
  selector: 'app-play-solo',
  templateUrl: './play-solo.component.html',
  styleUrls: ['./play-solo.component.css']
})
export class PlaySoloComponent implements OnInit {

  constructor(
    public listDeckCardsService: ListDeckCardsService
  ) { }

  ngOnInit(): void {
    this.listDeckCardsService.getDeck();
  }

}
