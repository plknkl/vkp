import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    shifts: [Shift]
    shift(name: String!): Shift
  }

  extend type Mutation { 
    createShift(
      name: String!
    ): Shift!

    updateShift(
      oldName: String!
      newName: String!
    ): Shift!
    
    deleteShift(
      name: String!
    ): Boolean!
  }

  type Shift {
    name: String!
  }
`
