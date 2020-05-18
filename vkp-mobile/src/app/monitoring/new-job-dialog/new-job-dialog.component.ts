import { Component, Inject } from '@angular/core'
import { FormGroup, Validators, FormControl } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Article } from '../../models/article'
import { Shift } from '../../models/shift'

export interface DialogData {
  articles: Article[],
  shifts: Shift[],
  batchNumber: string,
  articleName: string,
  shiftName: string
}

@Component({
  selector: 'app-new-job-dialog',
  templateUrl: './new-job-dialog.component.html',
  styleUrls: ['./new-job-dialog.component.scss'],
})
export class NewJobDialogComponent {
  public batchNumberControl: FormControl = new FormControl('',[Validators.required])
  public articleNameControl: FormControl = new FormControl('',[Validators.required])
  public shiftNameControl: FormControl = new FormControl('',[Validators.required])
  public newJobForm: FormGroup = new FormGroup(
    {
      batchNumber: this.batchNumberControl,
      articleName: this.articleNameControl,
      shiftName: this.shiftNameControl
    }
  )
  constructor(
    public dialogRef: MatDialogRef<NewJobDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.batchNumberControl.valueChanges.subscribe((val) => {
      this.data.batchNumber = val
    })
    this.articleNameControl.valueChanges.subscribe((val) => {
      this.data.articleName = val
    })
    this.shiftNameControl.valueChanges.subscribe((val) => {
      this.data.shiftName = val
    })
  }

  onNoClick(): void {
    this.dialogRef.close()
  }
}
