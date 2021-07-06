import {Component, Input, OnInit} from '@angular/core';
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
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    console.log(this.urlPlay);
  }

  public handleModeClick(): void {
    this.localStorageService.updateLocalStorageAttributes();
    if(this.localStorageService.paramGame !== null && Date.now() - this.localStorageService.paramGame.time <= 5000 && this.localStorageService.paramGame.deckId) {
      this.router.navigate([`play/${this.nameMode}/decks/${this.localStorageService.paramGame.deckId}`]);
      this.router.navigate([`play/${this.nameMode}/decks/${this.localStorageService.paramGame.deckId}`]);
    }else {
      this.localStorageService.setParamGame({mode: this.nameMode, time: Date.now()});
      this.router.navigate([this.urlPlay]);
    }
  }
}
