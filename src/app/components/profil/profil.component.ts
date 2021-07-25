import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SnackbarService} from '../../services/snackbar.service';
import {PasswordResetService} from '../../services/mindory-api/password-reset.service';
import {LocalStorageService} from '../../services/local-storage.service';
import {UserService} from '../../services/mindory-api/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  buttonIsInValidAfterClick = false;
  hidePasswordVisibility = true;
  hidePasswordConfirmationVisibility = true;

  constructor(
    private formBuilder: FormBuilder,
    private passwordResetService: PasswordResetService,
    private localStorageService: LocalStorageService,
    public userService: UserService,
    private router: Router,
    private snackBar: SnackbarService
  ) { }

  changePasswordForm: FormGroup = this.formBuilder.group({
    oldPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
    confirmationPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]]
  }, {validators: this.confirmPasswords('password', 'confirmationPassword')});

  ngOnInit(): void {
    this.userService.getUserByToken().subscribe();
  }

  public postChangePasswordForm(): Promise<void> {
    if (this.changePasswordForm.invalid && !this.changePasswordForm.dirty) {
      return;
    }

    this.buttonIsInValidAfterClick = true;

    this.attemptToChangePassword();
  }

  private attemptToChangePassword(): void {
    this.localStorageService.updateLocalStorageAttributes();
    this.passwordResetService.change(
      this.changePasswordForm.get('oldPassword').value as string,
      this.changePasswordForm.get('password').value as string,
      this.localStorageService.session.token
    )
    .subscribe(
      () => {
        this.snackBar.openSnackBar('Votre mot de passe a bien été changé', 'OK', 'Success');
      },
      error => {
        this.snackBar.openSnackBar('Votre mot de passe est incorrect', 'OK', 'Error');
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
