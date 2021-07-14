import {Component, OnDestroy, OnInit} from '@angular/core';
import {LocalStorageService} from '../../services/local-storage.service';
import {NavigationStart, Router} from '@angular/router';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private localStorageService: LocalStorageService,
  ) {
  }

  ngOnInit(): void {
    this.localStorageService.deleteParamGame();
  }

}
