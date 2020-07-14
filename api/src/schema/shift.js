import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    shifts(shopName: String): [Shift]
    shift(name: String!): Shift
  }

  extend type Mutation { 
    createShift(
      name: String!, 
      shopName: String!
    ): Shift!

    updateShift(
      oldName: String!
      newName: String!
      shopName: String!
    ): Shift!
    
    deleteShift(
      name: String!
    ): Boolean!
  }

  type Shift {
    name: String!
    shop: Shop
  }
`
