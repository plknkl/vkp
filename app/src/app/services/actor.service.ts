import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { ActorData, ActorsData, ActorUpdatedData } from './interfaces'
import { map } from 'rxjs/operators'
import { BehaviorSubject } from 'rxjs'
import { Actor } from '../models/actor'
import { ErrorCatch } from '../decorators/error-catch'

import {
  GET_ACTORS,
  UPDATE_ACTOR_STATUS,
  GET_ACTOR,
  SUBSCRIBE_TO_UPDATED_ACTOR,
  START_ACTOR_PROCESS,
  FINISH_ACTOR_PROCESS,
  CREATE_ACTOR,
  UPDATE_ACTOR,
  DELETE_ACTOR
} from './queries/actor_queries'

@Injectable({
  providedIn: 'root',
})
export class ActorService {
  // This should hold the websocket connection to avoid recreating it
  // on every component reload
  private _updatedActorSubscription: BehaviorSubject<Actor>
  private _actorList: Actor[] = []

  constructor(private apollo: Apollo) {}

  @ErrorCatch
  public createActor$(name: string, operationName: string, shopName: string) {
    return this.apollo.mutate<ActorData>({
      mutation: CREATE_ACTOR,
      variables: {
        name,
        operationName,
        shopName
      }
    })
  }

  @ErrorCatch
  public updateActor$(oldName: string, newName: string, operationName: string, shopName: string) {
    return this.apollo.mutate<ActorData>({
      mutation: UPDATE_ACTOR,
      variables: {
        oldName,
        newName,
        operationName,
        shopName
      }
    })
  }

  @ErrorCatch
  public deleteActor$(item: Actor) {
    return this.apollo.mutate({
      mutation: DELETE_ACTOR,
      variables: {
        name: item.name,
        operationName: item.operation.name
      },
    })
  }

  @ErrorCatch
  public getActorList$() {
    return this.apollo
      .query<ActorsData>({
        query: GET_ACTORS,
      })
      .pipe(
        map((result) => {
          result.data.actors.forEach( (actor) => {
            if (actor.currentJob) {
              actor.currentJob.batch.details = JSON.parse(actor.currentJob.batch.details as string)
            }
          })
          this._actorList = result.data.actors
          return result.data.actors
        })
      )
  }

  @ErrorCatch
  public getActor$(name: string, operationName: string) {
    return this.apollo
      .query<ActorData>({
        query: GET_ACTOR,
        variables: {
          actorName: name,
          operationName
        },
      })
      .pipe(
        map((result) => {
          return result.data.actor
        })
      )
  }

  public getActorFromName(name: string, operationName: string) {
    if (this._actorList.length === 0) {
      return null
    }
    return this._actorList.find(
      (x) => (x.name === name) && (x.operation.name === operationName)
    )
  }

  @ErrorCatch
  public updateActorStatus$(actorName: string, operationName:string, status: string) {
    return this.apollo.mutate({
      mutation: UPDATE_ACTOR_STATUS,
      variables: {
        actorName,
        operationName,
        status,
      },
    })
  }

  @ErrorCatch
  public startActorProcess$(
    actorName: string,
    operationName: string,
    details: string,
    shiftName: string
  ) {
    return this.apollo.mutate({
      mutation: START_ACTOR_PROCESS,
      variables: {
        actorName,
        operationName,
        details,
        shiftName
      },
    })
  }

  @ErrorCatch
  public finishActorProcess$(actorName: string, operationName: string, quantity: number) {
    return this.apollo.mutate({
      mutation: FINISH_ACTOR_PROCESS,
      variables: {
        actorName,
        operationName,
        quantity,
      },
    })
  }

  public updatedActorSubscription$() {
    if (this._updatedActorSubscription === undefined) {
      this._updatedActorSubscription = new BehaviorSubject<Actor>(null)
      this.apollo
        .subscribe<ActorUpdatedData>({
          query: SUBSCRIBE_TO_UPDATED_ACTOR,
        })
        .pipe(
          map((result) => {
            const actor = result.data.actorUpdated
            this.getActorFromName(actor.name, actor.operation.name).status = actor.status
            return actor
          })
        )
        .subscribe(this._updatedActorSubscription)
    }
    return this._updatedActorSubscription
  }
}
