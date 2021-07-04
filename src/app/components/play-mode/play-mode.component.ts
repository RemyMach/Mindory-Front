import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
