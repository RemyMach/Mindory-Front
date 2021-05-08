import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidateFn} from 'codelyzer/walkerFactory/walkerFn';
import {AuthService} from '../../services/mindory-api/auth.service';
import {Router} from '@angular/router';
import {SnackbarService} from '../../services/snackbar.service';

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
    private authService: AuthService,
    private router: Router,
    private snackBar: SnackbarService
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

  public postSubscribeForm(): Promise<void> {
    if (this.subscribeForm.invalid && !this.subscribeForm.dirty) {
      return;
    }

    this.buttonIsInValidAfterClick = true;

    this.attemptToSubscribe();
  }

  private attemptToSubscribe(): void {

    this.authService.subscribe({
      id: null,
      name: this.subscribeForm.get('name').value as string,
      surname: this.subscribeForm.get('surname').value as string,
      email: this.subscribeForm.get('email').value as string,
      password: this.subscribeForm.get('password').value as string,
      username: this.subscribeForm.get('username').value as string
    })
      .subscribe(
        data => {
          this.authService.login(this.subscribeForm.get('email').value, this.subscribeForm.get('password').value)
            .subscribe(
              dataLogin => {
                this.router.navigate(['']);
              },
              error => {
                this.snackBar.openSnackBar('impossible to connect retry later in login page', 'OK', 'Error');
                this.buttonIsInValidAfterClick = false;
              }
            );
          this.router.navigate(['']);
        },
        error => {
          this.snackBar.openSnackBar(error, 'OK', 'Error');
          this.buttonIsInValidAfterClick = false;
        }
      );
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
