import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DialogConfirmationComponent} from '../components/dialog-confirmation/dialog-confirmation.component';
import {DialogConfirmation} from '../models/dialogConfirmation';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DialogConfirmationService {

  dialogRef: MatDialogRef<DialogConfirmationComponent>;

  constructor(private dialog: MatDialog){}

  public open(options: DialogConfirmation): void {
    this.dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: {
        title: options.title,
        subTitle: options.subTitle,
        message: options.message,
        cancelText: options.cancelText,
        confirmText: options.confirmText
      }
    });
  }

  public confirmed(): Observable<any> {
    return this.dialogRef.afterClosed().pipe(take(1), map(res => {
        return res;
      }
    ));
  }
}
