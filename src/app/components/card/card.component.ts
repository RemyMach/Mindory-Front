import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Card} from '../../models/card.model';
import {ListDeckCardsService} from '../../services/mindory-api/deck/list-deck-cards.service';
import {PlaySoloService} from '../../services/play/play-solo.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() card: Card;
  @ViewChild('elementClickable') elementClickable: ElementRef<HTMLDivElement>;

  constructor(
    public listDeckCardsService: ListDeckCardsService,
    public playSoloService: PlaySoloService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) { }

  ngOnInit(): void {
  }
  public async handleClick(): Promise<void> {
    const element = this.elementClickable.nativeElement;

    await this.playSoloService.clickOnCard(this.card, element);
    this.renderer.setStyle(element,  'cursor', 'default');
    this.renderer.addClass(element,  'flip');
  }


}
