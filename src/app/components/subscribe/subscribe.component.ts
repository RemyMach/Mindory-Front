import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidateFn} from 'codelyzer/walkerFactory/walkerFn';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {
  buttonIsInValidAfterClick = false;
  hidePasswordVisibility = true;
  hidePasswordConfirmationVisibility = true;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  subscribeForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    surname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
    confirmationPassword: ['', [Validators.required]],
    username: ['', [Validators.required]]
  }, {validators: this.confirmPasswords('password', 'confirmationPassword')});

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

  confirmPasswords(controlName: string, matchingControlName: string): (formGroup: FormGroup) => void {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({mustMatch: true});
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
