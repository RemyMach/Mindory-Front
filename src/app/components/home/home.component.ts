import {Component, OnDestroy, OnInit} from '@angular/core';
import {LocalStorageService} from '../../services/local-storage.service';
import {NavigationStart, Router} from '@angular/router';
import {Subscription} from 'rxjs';

import { browserRefresh } from '../../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public browserRefresh: boolean;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.localStorageService.deleteParamGame();
    this.browserRefresh = browserRefresh;
    console.log(browserRefresh);
  }

}
