export interface Log {
  entity: {
    __typename: string
    name: string
    actor: {
      name: string
      operation: {
        name: string
      }
    }
    batch: {
      businessId: string
      article: {
        name: string
      }
    }
    shift: { 
      name: string
    }
  }
  status: string
  actor: string
  job: string
  createdAt: Date
}
