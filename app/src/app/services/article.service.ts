import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { map } from 'rxjs/operators'
import { Article } from '../models/article'
import { 
  ArticlesData,
  ArticleData 
} from './interfaces'

import { 
  GET_ARTICLES,
  GET_ARTICLE,
  UPDATE_ARTICLE, 
  DELETE_ARTICLE ,
  CREATE_ARTICLE
} from './queries/article_queries'

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private apollo: Apollo) {}

  public getArticles$() {
    return this.apollo
      .query<ArticlesData>({
        query: GET_ARTICLES,
      })
      .pipe(
        map((result) => {
          return result.data.articles
        })
      )
  }

  public getArticle$(name: string) {
    return this.apollo
      .query<ArticleData>({
        query: GET_ARTICLE,
        variables: {
          name
        }
      })
      .pipe(
        map((result) => {
          return result.data.article
        })
      )
  }
  
  public createArticle$(
    name: string,
  ) {
    return this.apollo.mutate({
      mutation: CREATE_ARTICLE,
      variables: {
        name,
      },
    })
  }

  public updateArticle$(
    oldName: string,
    newName: string,
  ) {
    return this.apollo.mutate({
      mutation: UPDATE_ARTICLE,
      variables: {
        oldName,
        newName,
      },
    })
  }

  public deleteArticle$(
    item: Article,
  ) {
    return this.apollo.mutate({
      mutation: DELETE_ARTICLE,
      variables: {
        name: item.name
      },
    })
  }
}
