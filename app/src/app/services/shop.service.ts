import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators'
import { 
  ShopsData,
  ShopData 
} from './interfaces'

import { 
  GET_SHOPS,
  GET_SHOP,
  UPDATE_SHOP, 
  DELETE_SHOP ,
  CREATE_SHOP
} from './queries/shop_queries'

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  constructor(private apollo: Apollo) {}

  public getShops$() {
    return this.apollo
      .query<ShopsData>({
        query: GET_SHOPS,
      })
      .pipe(
        map((result) => {
          return result.data.shops
        })
      )
  }

  public getShop$(name: string) {
    return this.apollo
      .query<ShopData>({
        query: GET_SHOP,
        variables: {
          name
        }
      })
      .pipe(
        map((result) => {
          return result.data.shop
        })
      )
  }
  
  public createShop$(
    name: string,
  ) {
    return this.apollo.mutate({
      mutation: CREATE_SHOP,
      variables: {
        name,
      },
    })
  }

  public updateShop$(
    oldName: string,
    newName: string,
  ) {
    return this.apollo.mutate({
      mutation: UPDATE_SHOP,
      variables: {
        oldName,
        newName,
      },
    })
  }

  public deleteShop$(
    name: string,
  ) {
    return this.apollo.mutate({
      mutation: DELETE_SHOP,
      variables: {
        name
      },
    })
  }
}
