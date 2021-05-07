import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  buttonIsInValidAfterClick = false;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required, Validators.min(8), Validators.max(50)]
  });

  ngOnInit(): void {
  }

  async postDisponibilityForm(): Promise<void> {
    if (this.loginForm.invalid && !this.loginForm.dirty) {
      return;
    }

    this.buttonIsInValidAfterClick = true;


    await this.attemptToLogin();
  }

  private async attemptToLogin(): Promise<void> {

    //tentative de connexion ici
  }

}
