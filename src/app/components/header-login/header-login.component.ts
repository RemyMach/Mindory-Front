import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-header-login',
  templateUrl: './header-login.component.html',
  styleUrls: ['./header-login.component.css']
})
export class HeaderLoginComponent implements OnInit {
  PAGE_URL = this.router.url;
  constructor(
     public router: Router,
     private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.tryConnect();
  }

}
