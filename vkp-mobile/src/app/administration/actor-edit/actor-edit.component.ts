import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import { ToolbarService } from '../../services/toolbar.service'
import { ActorService } from '../../services/actor.service'
import { OperationService } from '../../services/operation.service'
import { Actor } from '../../models/actor'
import { Operation } from '../../models/operation'
import { ACTOR } from '../../constants/routing-map'
import { switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-actor-edit',
  templateUrl: './actor-edit.component.html',
  styleUrls: ['./actor-edit.component.scss']
})
export class ActorEditComponent implements OnInit {
  actorForm: FormGroup
  currentItem: Actor
  operations: Operation[]

  constructor(
    private _formBuilder: FormBuilder,
    private _toolbarService: ToolbarService,
    private _actorService: ActorService,
    private _operationService: OperationService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.actorForm = this._formBuilder.group({
      name: [''],
      operation: ['']
    })
  }

  ngOnInit(): void {

    this._operationService.getOperations$().subscribe((operations: Operation[]) => {
      this.operations = operations
    })

    this._activatedRoute.url.pipe(
      switchMap((url) => this._actorService.getActor$(url.pop().path))
    ).subscribe((item: Actor) => {
        if (item) {
          this.currentItem = item
          this.actorForm.setValue({ name: item.name, operation: item.operation.name })
          this._toolbarService.changeTitle('Edit')
        } else {
          this._toolbarService.changeTitle('New')
        }
      })
  }

  onDelete() {
    this._actorService.deleteActor$(this.currentItem).subscribe(() => {
      this._router.navigate(['administration', ACTOR])
    })
  }

  onSubmit() {
    if (this.currentItem) {
      this._actorService.updateActor$(
        this.currentItem.name,
        this.actorForm.value.name, 
        this.actorForm.value.operation).subscribe(() => {
          this._router.navigate(['administration', ACTOR])
        })
    } else {
      this._actorService.createActor$(
        this.actorForm.value.name, 
        this.actorForm.value.operation).subscribe(() => {
          this._router.navigate(['administration', ACTOR])
        })
    }
  }

}