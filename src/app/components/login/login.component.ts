import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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


    await this.attemptToLogin();
  }

  private async attemptToLogin(): Promise<void> {

    console.log('oui ça fonctionne');
    //tentative de connexion ici
  }

}
