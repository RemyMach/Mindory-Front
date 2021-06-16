import {Component, Input, OnInit} from '@angular/core';
import {Card} from '../../models/card.model';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {
  @Input() cards: Card[];
  constructor() { }

  ngOnInit(): void {
  }

}
