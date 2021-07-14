import {Component, Input, OnInit} from '@angular/core';
import {Deck} from '../../models/deck.model';
import {Router} from '@angular/router';
import {PlaySoloService} from '../../services/play/play-solo.service';
import {PlayDuoService} from '../../services/play/play-duo.service';
import {SocketService} from '../../services/socket/socket.service';

@Component({
  selector: 'app-banner-play-duo',
  templateUrl: './banner-play-duo.component.html',
  styleUrls: ['./banner-play-duo.component.css']
})
export class BannerPlayDuoComponent implements OnInit {

  @Input() deck: Deck | undefined;
  public lastRecord: Date;
  public time: Date = new Date(0);
  constructor(
    private router: Router,
    public playDuoService: PlayDuoService,
    public socketService: SocketService
  ) { }

  ngOnInit(): void {}
  public handleDeckClick(): void {
    this.router.navigate(['play/decks']);
  }

}
