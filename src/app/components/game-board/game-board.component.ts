import {Component, Input, OnInit, Renderer2} from '@angular/core';
import {Card} from '../../models/card.model';
import {PlaySoloService} from '../../services/play/play-solo.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {
  @Input() cards: Card[];
  constructor(
    public playSoloService: PlaySoloService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
  }

}
