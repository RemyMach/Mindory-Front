import {Component, OnInit} from '@angular/core';
import {ListDeckService} from '../../services/mindory-api/deck/list-deck.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-deck-example',
  templateUrl: './deck-example.component.html',
  styleUrls: ['./deck-example.component.css']
})
export class DeckExampleComponent implements OnInit {

  constructor(
    public router: Router,
    public listDeckService: ListDeckService
  ) { }

  ngOnInit(): void {
    this.listDeckService.getDecksFromHome();
  }

}
