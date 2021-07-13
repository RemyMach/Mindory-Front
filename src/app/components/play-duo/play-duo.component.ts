import {Component, HostListener, Inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {PlayDuoService} from '../../services/play/play-duo.service';
import {SocketService} from '../../services/socket/socket.service';
import {SnackbarService} from '../../services/snackbar.service';
import {Subscription} from 'rxjs';

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
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    this.playDuoService.getActualRoomAndInitiateStartOfTheGame();
  }

  ngOnDestroy(): void {
    this.socketService.disconnect();
  }

  public refreshPage(): void {
    this.document.defaultView.location.reload();
  }

  /*@HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event): string {
    const result = confirm('Si vous rechargez cette page la partie sera finit et vous serez redirigé');
    if (result) {
      // Do more processing...
      console.log('pomme');
    }
    event.returnValue = false; // stay on same page
    return 'bang bang';
  }*/

  @HostListener('window:beforeunload', ['$event']) onBeforeUnload(event: Event): Subscription {
    event.returnValue = false;
    return this.snackbarService.openSnackBarWithANullReturn('yoyo', 'OK', 'success').subscribe(
      data => {
        event.returnValue = false;
        console.log('jean');
        //const result = confirm('Si vous rechargez cette page la partie sera finit et vous serez redirigé');
      }
    );
  }
}
