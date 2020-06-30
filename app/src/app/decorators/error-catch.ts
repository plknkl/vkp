import { catchError } from 'rxjs/operators'
import { of } from 'rxjs'

export function ErrorCatch(_, __, descriptor) {
  const oldFunc = descriptor.value
  descriptor.value = function(...args) {
    return oldFunc.apply(this, args).pipe(
      catchError((err) => {
        console.log(err)
        return of(null)
      })
    )
  }
  return descriptor
}
