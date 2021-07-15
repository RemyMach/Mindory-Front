import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/mindory-api/authentication.service';
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
    private authService: AuthenticationService,
    private snackBar: SnackbarService,
  ) { }

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  ngOnInit(): void {
  }

  public postLoginForm(): void {
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
          this.router.navigate(['']);
        },
        error => {
          this.snackBar.openSnackBar(error, 'OK', 'Error');
          this.buttonIsInValidAfterClick = false;
        }
      );
  }

}
