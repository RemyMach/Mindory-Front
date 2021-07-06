import { Component, OnInit } from '@angular/core';
import {ListDeckService} from '../../services/mindory-api/deck/list-deck.service';
import {LocalStorageService} from '../../services/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.localStorageService.deleteParamGame();
  }

}
