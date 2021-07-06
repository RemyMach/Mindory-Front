import {Component, Input, OnInit} from '@angular/core';
import {Deck} from '../../models/deck.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-card-deck',
  templateUrl: './card-deck.component.html',
  styleUrls: ['./card-deck.component.css']
})
export class CardDeckComponent implements OnInit {
  @Input() deck: Deck;
  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }

}
