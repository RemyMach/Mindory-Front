import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Card} from '../../models/card.model';
import {ListDeckCardsService} from '../../services/mindory-api/deck/list-deck-cards.service';
import {PlaySoloService} from '../../services/play/play-solo.service';
import {PlayDuoService} from '../../services/play/play-duo.service';
import {SocketService} from '../../services/socket/socket.service';

@Component({
  selector: 'app-card-duo',
  templateUrl: './card-duo.component.html',
  styleUrls: ['./card-duo.component.css']
})
export class CardDuoComponent implements OnInit {
  @Input() card: Card;
  @ViewChild('elementClickable') elementClickable: ElementRef<HTMLDivElement>;


  constructor(
    public playDuoService: PlayDuoService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private socketService: SocketService
  ) { }

  ngOnInit(): void {
  }
  public async handleClick(): Promise<void> {
    if (this.playDuoService.gameStart === false && this.socketService.socket && this.playDuoService.idUserWhoPlay && this.socketService.socket.id === this.playDuoService.idUserWhoPlay) {
      this.playDuoService.gameStart = true;
      this.playDuoService.startGameChronometer();
    }
    const element = this.elementClickable.nativeElement;

    await this.playDuoService.clickOnCard(this.card, element);
    this.renderer.setStyle(element,  'cursor', 'default');
    this.renderer.addClass(element,  'flip');
  }

}
