import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SnackbarService} from '../../services/snackbar.service';
import {PasswordResetService} from '../../services/mindory-api/password-reset.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  buttonIsInValidAfterClick = false;
  forgetForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private passwordResetService: PasswordResetService,
    private router: Router,
    private snackBar: SnackbarService
  ) { }

  ngOnInit(): void {
  }

  public postForgetForm(): void {
    if (this.forgetForm.invalid && !this.forgetForm.dirty) {
      return;
    }
    this.buttonIsInValidAfterClick = true;
    this.resetPasswordUserNotAuthentify();
  }

  private resetPasswordUserNotAuthentify(): void {
    this.passwordResetService.forget(this.forgetForm.get('email').value)
      .subscribe(
        data => {
          this.snackBar.openSnackBar('Your have received an email if the account exist, check your spam just in case', 'OK', 'Info');
          this.buttonIsInValidAfterClick = false;
        },
        error => {
          this.snackBar.openSnackBar(error, 'OK', 'Error');
          this.buttonIsInValidAfterClick = false;
        }
      );
  }
}
