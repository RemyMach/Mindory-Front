import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/mindory-api/auth.service';

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
    private authService: AuthService
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
    console.log('je vois ce qui se passe');
  }

  private attemptToLogin(): void {

    this.authService.login(this.loginForm.get('email').value, this.loginForm.get('password').value)
      .subscribe(
        data => console.log('success', data),
        error => console.log('oops', error)
      );
    console.log('après le subscribe');
  }

}
