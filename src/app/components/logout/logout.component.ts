import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/mindory-api/authentication.service';
import {SnackbarService} from '../../services/snackbar.service';

@Component({
  template: ''
})

export class LogoutComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private snackBar: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void
  {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.snackBar.openSnackBar('Vous avez bien été déconnecté', 'OK', 'Success');
  }

}
