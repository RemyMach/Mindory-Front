import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {LocalStorageService} from '../../services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public router: Router,
    public authService: AuthService,
    public localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    if (this.localStorageService.getSessionToken()) {
      this.authService.tryConnect().subscribe();
      this.authService.tryConnectAnAdmin().subscribe();
    }
  }

  get isConnect(): boolean {
    return this.authService.isConnect();
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

}
