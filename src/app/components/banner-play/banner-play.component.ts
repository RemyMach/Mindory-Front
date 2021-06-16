import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Deck} from '../../models/deck.model';
import {Time} from '@angular/common';
import {interval} from 'rxjs';

@Component({
  selector: 'app-banner-play',
  templateUrl: './banner-play.component.html',
  styleUrls: ['./banner-play.component.css']
})
export class BannerPlayComponent implements OnInit {
  @Input() deck: Deck | undefined;
  public lastRecord: Date;
  public time: Date;
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    interval(1000).subscribe((d) => {
      this.time = new Date(d);
      this.time.setSeconds(d);
    });
  }
  public handleDeckClick(): void {
    this.router.navigate(['play/decks']);
  }
}
