import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-room-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent implements OnInit {

  color: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any,
              public snackBarRef: MatSnackBarRef<SnackbarComponent>) {
  }

  ngOnInit(): void {
  }

  get getIcon(): string {
    switch (this.data.snackType) {
      case 'Success':
        this.color = 'green';
        return 'done';
      case 'Error':
        this.color = 'red';
        return 'error';
      case 'Warn':
        this.color = 'red';
        return 'warning';
      case 'Info':
        this.color = 'blue';
        return 'info';
    }
  }
}
