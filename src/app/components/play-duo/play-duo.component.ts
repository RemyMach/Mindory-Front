import {Component, HostListener, Inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {PlayDuoService} from '../../services/play/play-duo.service';
import {SocketService} from '../../services/socket/socket.service';
import {SnackbarService} from '../../services/snackbar.service';
import {Subscription} from 'rxjs';
import {DialogConfirmationService} from '../../services/dialog-confirmation.service';
import {LocalStorageService} from '../../services/local-storage.service';

@Component({
  selector: 'app-play-duo',
  templateUrl: './play-duo.component.html',
  styleUrls: ['./play-duo.component.css']
})
export class PlayDuoComponent implements OnInit, OnDestroy {
  startGame = false;
  public browserRefresh: boolean;
  constructor(

    public router: Router,
    public route: ActivatedRoute,
    public playDuoService: PlayDuoService,
    public socketService: SocketService,
    public snackbarService: SnackbarService,
    public localStorageService: LocalStorageService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    if (this.localStorageService.getSessionToken())
      this.playDuoService.getActualRoomAndInitiateStartOfTheGame();
    else
      this.playDuoService.getActualRoomForAnonymous(this.route.snapshot.params.token);
  }

  ngOnDestroy(): void {
    this.socketService.disconnect();
  }

  public refreshPage(): void {
    this.document.defaultView.location.reload();
  }
}
