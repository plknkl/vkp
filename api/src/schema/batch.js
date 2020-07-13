import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    batches: [Batch]
  }

  type Batch {
    details: String
    article: Article
  }
`
