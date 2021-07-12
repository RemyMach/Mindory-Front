import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {SnackbarComponent} from '../components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  public openSnackBar(message: string, action: string, snackType?: string, duration?: number | null, redirectionPath?: string | null): void {
    const _snackType: string = snackType !== undefined ? snackType : 'Success';


    const snack = this.snackBar.openFromComponent(SnackbarComponent, {
      duration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      data: { message, snackType: _snackType, snackActionMessage: action}
    });

    snack.afterDismissed().subscribe(() => {
      if (redirectionPath !== null && redirectionPath !== undefined) {
        this.router.navigate([redirectionPath]);
      }
    });

    snack.onAction().subscribe(() => {

      this.snackBar.dismiss();
    });

  }
}
