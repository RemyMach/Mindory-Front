import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {
  buttonIsInValidAfterClick = false;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  subscribeForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    surname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.min(8), Validators.max(50)]],
    confirmationPassword: ['', [Validators.required]],
    username: ['', [Validators.required]]
  }, {validators: this.checkPasswords()});

  ngOnInit(): void {
  }

  async postSubscribeForm(): Promise<void> {
    if (this.subscribeForm.invalid && !this.subscribeForm.dirty) {
      return;
    }

    this.buttonIsInValidAfterClick = true;


    await this.attemptToLogin();
  }

  private async attemptToLogin(): Promise<void> {
    console.log('je fonctionne');
    /* TODO tentative d'inscription ici*/
  }

  checkPasswords(): boolean {
    return this.subscribeForm.get('password') === this.subscribeForm.get('confirmationPassword');
  }
}
