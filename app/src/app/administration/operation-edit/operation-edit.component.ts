import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { ToolbarService } from '../../services/toolbar.service'
import { OperationService } from '../../services/operation.service'
import { Operation } from '../../models/operation'
import { OPERATION } from '../../constants/routing-map'
import { switchMap } from 'rxjs/operators'
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';



export interface Item {
  name: string;
}

@Component({
  selector: 'app-operation-edit',
  templateUrl: './operation-edit.component.html',
  styleUrls: ['./operation-edit.component.scss']
})
export class OperationEditComponent implements OnInit {
  operationForm: FormGroup
  currentItem: Operation
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  items: Item[] = [
  ];

  constructor(
    private _formBuilder: FormBuilder,
    private _toolbarService: ToolbarService,
    private _operationService: OperationService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.operationForm = this._formBuilder.group({
      name: [''],
    })
  }

  ngOnInit(): void {
    this._activatedRoute.url.pipe(
      switchMap((url) => this._operationService.getOperation$(url.pop().path))
    ).subscribe((item: Operation) => {
        if (item) {
          this.currentItem = item
          console.log(item.items)
          this.items = JSON.parse(item.items)
          this.operationForm.setValue({name: item.name})
          this._toolbarService.changeTitle('edit')
        } else {
          this._toolbarService.changeTitle('new')
        }
      })
  }

  onSubmit() {
    const stringItems = JSON.stringify(this.items)
    if (this.currentItem) {
      this._operationService.updateOperation$(
        this.currentItem.name,
        this.operationForm.value.name,
        stringItems).subscribe(() => {
          this._router.navigate(['administration', OPERATION])
        })
    } else {
      this._operationService.createOperation$(
        this.operationForm.value.name,
        stringItems).subscribe(() => {
          this._router.navigate(['administration', OPERATION])
        })
    }
  }

  onDelete() {
    this._operationService.deleteOperation$(this.currentItem).subscribe(() => {
      this._router.navigate(['administration', OPERATION])
    })
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.items.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(item: Item): void {
    const index = this.items.indexOf(item);

    if (index >= 0) {
      this.items.splice(index, 1);
    }
  }

}
