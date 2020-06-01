import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { ToolbarService } from '../services/toolbar.service'
import { ARTICLE, ACTOR, OPERATION, SHIFT } from '../constants/routing-map'
import { ActorService } from '../services/actor.service'
import { Actor } from '../models/actor'
import { OperationService } from '../services/operation.service'
import { ShiftService } from '../services/shift.service'
import { Operation } from '../models/operation'
import { ArticleService } from '../services/article.service'
import { Article } from '../models/article'
import { Shift } from '../models/shift'

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss'],
})
export class AdministrationComponent implements OnInit, OnDestroy {
  items = []
  private _currentPage = ''

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _toolbarService: ToolbarService,
    private _actorService: ActorService,
    private _operationService: OperationService,
    private _articleService: ArticleService,
    private _shiftService: ShiftService,
  ) {}

  ngOnInit(): void {
    this._pageSwitch(ARTICLE)
    this._activatedRoute.params.subscribe((params) => {
      switch (params.any) {
        case ARTICLE:
          this._pageSwitch(ARTICLE)
          break;
        case ACTOR:
          this._pageSwitch(ACTOR)
          break;
        case OPERATION:
          this._pageSwitch(OPERATION)
          break;
        case SHIFT:
          this._pageSwitch(SHIFT)
          break;
        default:
          this._pageSwitch(ARTICLE)
          break;
      }
    })
    this._toolbarService.addButtons([ARTICLE, ACTOR, OPERATION, SHIFT])
    this._toolbarService.buttonClick.subscribe((btn: string) => {
      this._pageSwitch(btn)
    })
  }

  ngOnDestroy(): void {
    this._toolbarService.addButtons([])
  }

  onEdit(item: Actor | Operation | Article) {
    if(this._currentPage == OPERATION) {
      this._router.navigate(['administration', OPERATION, item.name], {state: {data: item}})
    }
    if(this._currentPage == SHIFT) {
      this._router.navigate(['administration', SHIFT, item.name], {state: {data: item}})
    }
    if(this._currentPage == ACTOR) {
      this._router.navigate(['administration', ACTOR, item.name], {state: {data: item}})
    }
    if(this._currentPage == ARTICLE) {
      this._router.navigate(['administration', ARTICLE, item.name], {state: {data: item}})
    }
  }

  onCreate() {
    if(this._currentPage == OPERATION) {
      this._router.navigate(['administration', OPERATION, 'new'])
    }
    if(this._currentPage == ACTOR) {
      this._router.navigate(['administration', ACTOR, 'new'])
    }
    if(this._currentPage == ARTICLE) {
      this._router.navigate(['administration', ARTICLE, 'new'])
    }
    if(this._currentPage == SHIFT) {
      this._router.navigate(['administration', SHIFT, 'new'])
    }
  }


  private _pageSwitch(page: string) {
    this._currentPage = page
    switch (page) {
      case ACTOR:
        this._toolbarService.changeTitle('actor admin')
        this._actorService.getActorList$().subscribe((actors: Actor[]) => {
          this.items = actors.map((actor) => {
            return {
              name: actor.name,
            }
          })
        })
        break
      case OPERATION:
        this._operationService
          .getOperations$()
          .subscribe((operations: Operation[]) => {
          this._toolbarService.changeTitle('operation admin')
            this.items = operations.map((operation) => {
              return {
                name: operation.name,
                description: operation.description,
              }
            })
          })
        break
      case ARTICLE:
        this._articleService.getArticles$().subscribe((articles: Article[]) => {
          this._toolbarService.changeTitle('article admin')
          this.items = articles.map((article) => {
            return {
              name: article.name,
            }
          })
        })
        break
      case SHIFT:
        this._shiftService.getShifts$().subscribe((shifts: Shift[]) => {
          this._toolbarService.changeTitle('shift admin')
          this.items = shifts.map((shift) => {
            return {
              name: shift.name,
            }
          })
        })
        break

      default:
        break
    }
  }
}
