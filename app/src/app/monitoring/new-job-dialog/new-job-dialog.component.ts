import { Component, Inject } from '@angular/core'
import { FormGroup, Validators, FormControl } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Shift } from '../../models/shift'

export interface DialogData {
  shifts: Shift[],
  items: String[],
  batchNumber: string,
  itemName: string,
  shiftName: string
}

@Component({
  selector: 'app-new-job-dialog',
  templateUrl: './new-job-dialog.component.html',
  styleUrls: ['./new-job-dialog.component.scss'],
})
export class NewJobDialogComponent {
  public batchNumberControl: FormControl = new FormControl('',[Validators.required])
  public itemNameControl: FormControl
  public shiftNameControl: FormControl = new FormControl('',[Validators.required])
  public newJobForm: FormGroup

  constructor(
    public dialogRef: MatDialogRef<NewJobDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {

    if(this.data.items.length > 0) {
      this.itemNameControl = new FormControl('', [Validators.required])
      this.newJobForm = new FormGroup(
        {
          batchNumber: this.batchNumberControl,
          itemName: this.itemNameControl,
          shiftName: this.shiftNameControl
        }
      )
      this.itemNameControl.valueChanges.subscribe((val) => {
        this.data.itemName = val
      })
    } else {
      this.newJobForm = new FormGroup(
        {
          batchNumber: this.batchNumberControl,
          shiftName: this.shiftNameControl
        }
      )
    }

    this.batchNumberControl.valueChanges.subscribe((val) => {
      this.data.batchNumber = val
    })
    this.shiftNameControl.valueChanges.subscribe((val) => {
      this.data.shiftName = val
    })
  }

  onNoClick(): void {
    this.dialogRef.close()
  }
}
