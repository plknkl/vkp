import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    articles: [Article]
    article(name: String!): Article
  }

  extend type Mutation { 
    createArticle(
      name: String!
    ): Article!

    updateArticle(
      oldName: String!
      newName: String!
    ): Article!
    
    deleteArticle(
      name: String!
    ): Boolean!
  }

  type Article {
    name: String!
  }
`
