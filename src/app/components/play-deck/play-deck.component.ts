import { Component, OnInit } from '@angular/core';
import {ListDeckService} from '../../services/mindory-api/deck/list-deck.service';

@Component({
  selector: 'app-play-deck',
  templateUrl: './play-deck.component.html',
  styleUrls: ['./play-deck.component.css']
})
export class PlayDeckComponent implements OnInit {

  constructor(
    public listDeckService: ListDeckService
  ) { }

  ngOnInit(): void {
    this.listDeckService.getDecksFromHome(30);
  }

}
