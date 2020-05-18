import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    operations: [Operation]
    operation(name: String!): Operation
  }

  extend type Mutation { 
    createOperation(
      name: String!
      description: String 
    ): Operation!

    updateOperation(
      oldName: String!
      newName: String!
      description: String 
    ): Operation!
    
    deleteOperation(
      name: String!
    ): Boolean!
  }

  type Operation {
    name: String!
    description: String!
    unit: String!
  }
`
