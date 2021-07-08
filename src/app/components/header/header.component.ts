import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public router: Router,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  get isConnect(): boolean {
    return this.authService.isConnect();
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

}
