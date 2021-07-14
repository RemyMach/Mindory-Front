import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/mindory-api/authentication.service';
import {SnackbarService} from '../../services/snackbar.service';
import {PasswordResetService} from '../../services/mindory-api/password-reset.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  buttonIsInValidAfterClick = false;
  hidePasswordVisibility = true;
  hidePasswordConfirmationVisibility = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private snackBar: SnackbarService,
    private activatedRoute: ActivatedRoute,
    private passwordResetService: PasswordResetService
  ) { }

  resetPasswordForm: FormGroup = this.formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
    confirmationPassword: ['', [Validators.required]],
  }, {validators: this.confirmPasswords('password', 'confirmationPassword')});

  ngOnInit(): void {
  }

  postResetPasswordForm(): void {
    if (this.resetPasswordForm.invalid && !this.resetPasswordForm.dirty) {
      return;
    }
    this.buttonIsInValidAfterClick = true;

    const token = this.activatedRoute.snapshot.params.token;
    this.attemptToResetPassword(token);

  }
  attemptToResetPassword(token): void {
    this.passwordResetService.reset(token, this.resetPasswordForm.get('password').value)
      .subscribe(
        data => {
          this.snackBar.openSnackBar('Votre mot de passe a été mis à jour, vous pouvez vous reconnecter', 'OK', 'Success');
        },
        error => {
          console.log(error.body);
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
