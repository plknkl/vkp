import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

export interface DialogData {
  quantity: number
}

@Component({
  selector: 'app-finish-job-dialog',
  templateUrl: './finish-job-dialog.component.html',
  styleUrls: ['./finish-job-dialog.component.scss'],
})
export class FinishJobDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<FinishJobDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close()
  }
}
