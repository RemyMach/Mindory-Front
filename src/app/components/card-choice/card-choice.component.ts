import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../services/local-storage.service';

@Component({
  selector: 'app-card-choice',
  templateUrl: './card-choice.component.html',
  styleUrls: ['./card-choice.component.css']
})
export class CardChoiceComponent implements OnInit {

  @Input() text: string;
  @Input() title: string;
  @Input() nameMode: 'solo' | 'duo';
  @Input() mode_icon: string;
  @Input() urlPlay: string;
  @Input() TextClickable?: string;
  @Output() cardClicked: EventEmitter<string[]> = new EventEmitter<string[]>();
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    console.log(this.urlPlay);
  }

  public handleModeClick(): void {
    if(this.nameMode === 'solo' || this.nameMode === 'duo') {
      this.cardClicked.emit([this.nameMode, this.urlPlay]);
    }else {
      this.cardClicked.emit([this.nameMode, this.urlPlay]);
    }
  }
}
