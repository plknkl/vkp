import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    operations: [Operation]
    operation(name: String!): Operation
  }

  extend type Mutation { 
    createOperation(
      name: String!
      items: String
    ): Operation!

    updateOperation(
      oldName: String!
      newName: String!
      items: String
    ): Operation!
    
    deleteOperation(
      name: String!
    ): Boolean!
  }

  type Operation {
    name: String
    unit: String
    items: String
  }
`
