import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    actors(shopName: String): [Actor]
    actor(name: String!, operationName: String!): Actor
  }

  extend type Mutation {
    createActor(
      name: String!
      operationName: String!
      shopName: String!
    ): Actor!

    deleteActor(
      name: String!,
      operationName: String!
    ): Boolean!

    updateActor(
      oldName: String!
      newName: String!
      operationName: String!
      shopName: String!
    ): Actor!

    updateActorStatus(
      name: String!
      operationName: String!
      status: String!
    ): Actor!

    updateActorOperation(
      actorName: String!
      operationName: String!
    ): Actor!

    startActorProcess(
      actorName: String!
      operationName: String!
      details: String!
      shiftName: String!
    ): Actor!

    interruptActorProcess(
      actorName: String!
      operationName: String!
    ): Actor!

    finishActorProcess(
      actorName: String!
      operationName: String!
      quantity: Int
    ): Actor!

    breakActor(
      actorName: String!
      operationName: String!
    ): Actor!
  }

  extend type Subscription {
    actorUpdated: Actor!
  }

  type Actor {
    name: String!
    status: String!
    operation: Operation
    shop: Shop
    currentJob: Job
    updatedAt: Date
  }
`
