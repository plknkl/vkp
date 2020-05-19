import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    actors: [Actor]
    actor(name: String!): Actor
  }

  extend type Mutation {
    createActor(
      name: String!
      operationName: String!
    ): Actor!

    deleteActor(
      name: String!
    ): Boolean!

    updateActor(
      oldName: String!
      newName: String!
      operationName: String!
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
      batchBusinessId: String!
      articleName: String!,
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
    currentJob: Job
    updatedAt: Date
  }
`
