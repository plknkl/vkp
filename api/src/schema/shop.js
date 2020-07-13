import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    shops: [Shop]
    shop(name: String!): Shop
  }

  extend type Mutation { 
    createShop(
      name: String!
    ): Shop!

    updateShop(
      oldName: String!
      newName: String!
    ): Shop!
    
    deleteShop(
      name: String!
    ): Boolean!
  }

  type Shop {
    name: String!
  }
`
