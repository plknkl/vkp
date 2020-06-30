import { Subject } from 'rxjs'
import { WebSocketLink } from 'apollo-link-ws'
import { environment } from '../../environments/environment'
import { onError } from 'apollo-link-error';

const ws = new WebSocketLink({
      uri: environment.baseUrl,
      reconnect: true,
    })

export const errorSubject = new Subject()
const error = onError(() => {
    errorSubject.next()
  }
)
export const link = error.concat(ws)
