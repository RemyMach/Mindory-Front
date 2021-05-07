import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header-login',
  templateUrl: './header-login.component.html',
  styleUrls: ['./header-login.component.css']
})
export class HeaderLoginComponent implements OnInit {
  PAGE_URL = this.router.url;
  constructor(
     public router: Router
  ) { }

  ngOnInit(): void {
  }

}
