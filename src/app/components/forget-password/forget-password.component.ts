import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/mindory-api/auth.service';
import {SnackbarService} from '../../services/snackbar.service';

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

  }

}
