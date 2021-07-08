import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-decks-list',
  templateUrl: './admin-decks-list.component.html',
  styleUrls: ['./admin-decks-list.component.css']
})
export class AdminDecksListComponent implements OnInit {
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {}
  public handleDeckClick(): void {
    this.router.navigate(['play/decks']);
  }
}
