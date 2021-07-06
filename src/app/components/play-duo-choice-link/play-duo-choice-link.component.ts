import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
