import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/mindory-api/auth.service';
import {interval} from 'rxjs';
import {SnackbarService} from '../../services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  buttonIsInValidAfterClick = false;
  hidePasswordVisibility = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: SnackbarService
  ) { }

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  ngOnInit(): void {
  }

  async postLoginForm(): Promise<void> {
    if (this.loginForm.invalid && !this.loginForm.dirty) {
      return;
    }

    this.buttonIsInValidAfterClick = true;


    this.attemptToLogin();
  }

  private attemptToLogin(): void {

    this.authService.login(this.loginForm.get('email').value, this.loginForm.get('password').value)
    .subscribe(
        data => {
          this.router.navigate(['home']);
        },
        error => {

          this.snackBar.openSnackBar(error, 'OK', 'Error');
        }
      );
  }

}
