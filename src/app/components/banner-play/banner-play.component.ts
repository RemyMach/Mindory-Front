import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Deck} from '../../models/deck.model';
import {PlaySoloService} from '../../services/play/play-solo.service';

@Component({
  selector: 'app-banner-play',
  templateUrl: './banner-play.component.html',
  styleUrls: ['./banner-play.component.css']
})
export class BannerPlayComponent implements OnInit {
  @Input() deck: Deck | undefined;
  public lastRecord: Date;
  public time: Date = new Date(0);
  constructor(
    private router: Router,
    public playSoloService: PlaySoloService
  ) { }

  ngOnInit(): void {}
  public handleDeckClick(): void {
    this.router.navigate(['play/decks']);
  }
}
