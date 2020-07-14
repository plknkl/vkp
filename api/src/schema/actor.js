import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    actors(shopName: String): [Actor]
    actor(name: String!): Actor
  }

  extend type Mutation {
    createActor(
      name: String!
      operationName: String!
      shopName: String!
    ): Actor!

    deleteActor(
      name: String!
    ): Boolean!

    updateActor(
      oldName: String!
      newName: String!
      operationName: String!
      shopName: String!
    ): Actor!

    updateActorStatus(
      name: String!
      status: String!
    ): Actor!

    updateActorOperation(
      actorName: String!
      operationName: String!
    ): Actor!

    startActorProcess(
      actorName: String!
      details: String!
      shiftName: String!
    ): Actor!

    interruptActorProcess(
      actorName: String!
    ): Actor!

    finishActorProcess(
      actorName: String!
      quantity: Int
    ): Actor!

    breakActor(
      actorName: String!
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
