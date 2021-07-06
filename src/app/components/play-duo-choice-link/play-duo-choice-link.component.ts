import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../services/local-storage.service';

@Component({
  selector: 'app-play-duo-choice-link',
  templateUrl: './play-duo-choice-link.component.html',
  styleUrls: ['./play-duo-choice-link.component.css']
})
export class PlayDuoChoiceLinkComponent implements OnInit {

  textFirstCard = 'Créer une partie pour ensuite inviter un ami dedans';
  textSecondCard = 'Rejoignez une partie déjà créé par un ami';
  titleFirstCard = 'Création d\'une partie';
  titleSecondCard = 'Rejoindre une partie';
  createIcon = 'add';
  joinIcon = 'directions_run';
  createURL = 'play/duo/create';
  joinURL = 'play/duo/join';
  createTitle = 'create';
  joinTitle = 'join';

  constructor(
    private router: Router,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit(): void {
  }

  handleCardClicked(event): void {
    if(event[0] === 'create') {
      this.router.navigate(['/play/decks']);
      this.localStorage.setParamGame({link: event[0], time: Date.now()});
    }else if(event[0] === 'join') {
      this.localStorage.setParamGame({link: event[0], time: Date.now()});
      this.router.navigate(['play/join']);
    }
  }

}
