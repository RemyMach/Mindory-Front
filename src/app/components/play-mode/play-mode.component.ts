import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../services/local-storage.service';

@Component({
  selector: 'app-play-mode',
  templateUrl: './play-mode.component.html',
  styleUrls: ['./play-mode.component.css']
})
export class PlayModeComponent implements OnInit {
  textFirstCard = 'Apprenez sur le sujet de votre choix graçe à nos super decks';
  textSecondCard = 'Défiez vos amis sur le deck de votre choix';
  titleFirstCard = 'Seul';
  titleSecondCard = '2 joueurs';
  modeSoloIcon = 'accessibility';
  modeTwoIcon = 'group';
  deckURL = '/play/decks';
  createJoinURL = '/play/duo/link';
  nameModeSolo = 'solo';
  nameModeDuo = 'duo';


  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
  }
  public cardEventHandler(event): void {
    this.localStorageService.updateLocalStorageAttributes();
    if (this.localStorageService.paramGame !== null && Date.now() - this.localStorageService.paramGame.time <= 5000 && this.localStorageService.paramGame.deckId) {
      if (event[0] === 'duo') {
        this.router.navigate(['play/duo/link']);
      }else {
        this.router.navigate([`play/${event[0] }/decks/${this.localStorageService.paramGame.deckId}`]);
      }
    }else {
      this.localStorageService.setParamGame({mode: event[0] , time: Date.now()});
      this.router.navigate([event[1]]);
    }
  }

}
