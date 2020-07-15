import gql from 'graphql-tag'

export const CREATE_ACTOR = gql`
mutation createActor($name: String!, $operationName: String!, $shopName: String!) {
  createActor(name: $name, operationName: $operationName, shopName: $shopName) {
    name
  }
}
`

export const UPDATE_ACTOR = gql`
mutation updateActor(
  $oldName: String!,
  $newName: String!,
  $operationName: String!,
  $shopName: String!,
) {
  updateActor(
    oldName: $oldName,
    newName: $newName,
    operationName: $operationName,
    shopName: $shopName
  ) {
    name
  }
}
`

export const DELETE_ACTOR = gql`
mutation deleteActor($name: String!, $operationName: String!) {
  deleteActor(name: $name, operationName: $operationName)
}
`

export const SET_ACTOR_PROCESS_STATUS = gql`
mutation update_machine {
  update_machine(where: { id: { _eq: 2 } }, _set: { status: 1 }) {
    affected_rows
    returning {
      id
      status
    }
  }
}
`

export const UPDATE_ACTOR_STATUS = gql`
mutation updateActorStatus($actorName: String!, $operationName: String!, $status: String!) {
  updateActorStatus(name: $actorName, operationName: $operationName, status: $status) {
    name
    status
    operation {
      name
    }
  }
}
`
export const START_ACTOR_PROCESS = gql`
mutation startActorProcess(
    $actorName: String!, 
    $operationName: String!, 
    $details: String!,
    $shiftName: String!
  ) {
  startActorProcess(
    actorName: $actorName,
    operationName: $operationName,
    details: $details,
    shiftName: $shiftName
  ) {
    name
    status
  }
}
`
export const FINISH_ACTOR_PROCESS = gql`
mutation finishActorProcess($actorName: String!, $operationName: String!, $quantity: Int) {
  finishActorProcess(actorName: $actorName, operationName: $operationName, quantity: $quantity) {
    name
    status
    operation {
      name
    }
  }
}
`

export const GET_ACTORS = gql`
query actors($shop: String){
  actors(shopName: $shop){
    name
    status
    operation {
      name
    }
    shop {
      name
    }
    updatedAt
    currentJob {
      batch {
        details
      }
    }
  }
}
`

export const GET_ACTOR = gql`
query actor($actorName: String!, $operationName: String!) {
  actor(name: $actorName, operationName: $operationName) {
    name
    status
    operation {
      name
      items
    }
    shop {
      name
    }
  }
}
`

export const SUBSCRIBE_TO_UPDATED_ACTOR = gql`
subscription {
  actorUpdated {
    name
    status
    operation {
      name
    }
  }
}
`
