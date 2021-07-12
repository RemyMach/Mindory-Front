import {Component, Input, OnInit} from '@angular/core';
import {Card} from '../../models/card.model';

@Component({
  selector: 'app-game-board-duo',
  templateUrl: './game-board-duo.component.html',
  styleUrls: ['./game-board-duo.component.css']
})
export class GameBoardDuoComponent implements OnInit {
  @Input() cards: Card[];
  constructor() { }

  ngOnInit(): void {
  }


}
