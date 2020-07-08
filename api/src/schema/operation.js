import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    operations: [Operation]
    operation(name: String!): Operation
  }

  extend type Mutation { 
    createOperation(
      name: String!
    ): Operation!

    updateOperation(
      oldName: String!
      newName: String!
    ): Operation!
    
    deleteOperation(
      name: String!
    ): Boolean!
  }

  type Operation {
    name: String
    unit: String
  }
`
