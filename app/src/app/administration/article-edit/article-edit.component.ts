import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { ToolbarService } from '../../services/toolbar.service'
import { ArticleService } from '../../services/article.service'
import { Article } from '../../models/article'
import { ARTICLE } from '../../constants/routing-map'
import { switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss']
})
export class ArticleEditComponent implements OnInit {
  articleForm: FormGroup
  currentItem: Article

  constructor(
    private _formBuilder: FormBuilder,
    private _toolbarService: ToolbarService,
    private _articleService: ArticleService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.articleForm = this._formBuilder.group({
      name: ['']
    })
  }

  ngOnInit(): void {
    this._activatedRoute.url.pipe(
      switchMap((url) => this._articleService.getArticle$(url.pop().path))
    ).subscribe((item: Article) => {
        if (item) {
          this.currentItem = item
          this.articleForm.setValue({name: item.name})
          this._toolbarService.changeTitle('edit')
        } else {
          this._toolbarService.changeTitle('new')
        }
      })
  }

  onSubmit() {
    if (this.currentItem) {
      this._articleService.updateArticle$(
        this.currentItem.name,
        this.articleForm.value.name).subscribe(() => {
          this._router.navigate(['administration', ARTICLE])
        })
    } else {
      this._articleService.createArticle$(
        this.articleForm.value.name).subscribe(() => {
          this._router.navigate(['administration', ARTICLE])
        })
    }
  }

  onDelete() {
    this._articleService.deleteArticle$(this.currentItem).subscribe(() => {
      this._router.navigate(['administration', ARTICLE])
    })
  }

}
