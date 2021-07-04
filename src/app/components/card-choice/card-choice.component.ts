import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card-choice',
  templateUrl: './card-choice.component.html',
  styleUrls: ['./card-choice.component.css']
})
export class CardChoiceComponent implements OnInit {

  @Input() text: string;
  @Input() title: string;
  @Input() mode_icon: string;
  constructor() { }

  ngOnInit(): void {
  }

}
