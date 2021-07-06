import { Component, OnInit } from '@angular/core';
import {ListDeckService} from '../../services/mindory-api/deck/list-deck.service';

@Component({
  selector: 'app-play-deck-duo',
  templateUrl: './play-deck-duo.component.html',
  styleUrls: ['./play-deck-duo.component.css']
})
export class PlayDeckDuoComponent implements OnInit {

  constructor(
    public listDeckService: ListDeckService
  ) { }

  ngOnInit(): void {
    this.listDeckService.getDecksFromHome(30);
  }

}
