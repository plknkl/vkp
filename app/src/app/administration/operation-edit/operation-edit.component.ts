import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { ToolbarService } from '../../services/toolbar.service'
import { OperationService } from '../../services/operation.service'
import { Operation } from '../../models/operation'
import { OPERATION } from '../../constants/routing-map'
import { switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-operation-edit',
  templateUrl: './operation-edit.component.html',
  styleUrls: ['./operation-edit.component.scss']
})
export class OperationEditComponent implements OnInit {
  operationForm: FormGroup
  currentItem: Operation

  constructor(
    private _formBuilder: FormBuilder,
    private _toolbarService: ToolbarService,
    private _operationService: OperationService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.operationForm = this._formBuilder.group({
      name: [''],
      description: [''],
    })
  }

  ngOnInit(): void {
    this._activatedRoute.url.pipe(
      switchMap((url) => this._operationService.getOperation$(url.pop().path))
    ).subscribe((item: Operation) => {
        if (item) {
          this.currentItem = item
          this.operationForm.setValue({name: item.name, description: item.description})
          this._toolbarService.changeTitle('edit')
        } else {
          this._toolbarService.changeTitle('new')
        }
      })
  }

  onSubmit() {
    if (this.currentItem) {
      this._operationService.updateOperation$(
        this.currentItem.name,
        this.operationForm.value.name, 
        this.operationForm.value.description).subscribe(() => {
          this._router.navigate(['administration', OPERATION])
        })
    } else {
      this._operationService.createOperation$(
        this.operationForm.value.name, 
        this.operationForm.value.description).subscribe(() => {
          this._router.navigate(['administration', OPERATION])
        })
    }
  }

  onDelete() {
    this._operationService.deleteOperation$(this.currentItem).subscribe(() => {
      this._router.navigate(['administration', OPERATION])
    })
  }

}
