import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogConfirmation} from '../../models/dialogConfirmation';

@Component({
  selector: 'app-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.css']
})


export class DialogConfirmationComponent{

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogConfirmation,
    private dialogRef: MatDialogRef<DialogConfirmationComponent>,
  ){}

  public close(value: boolean): void {
    this.dialogRef.close(value);
  }

  public cancel(): void {
    this.close(false);
  }

  public confirm(): void {
    this.close(true);
  }
}
