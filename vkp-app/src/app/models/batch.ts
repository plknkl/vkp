import { Article } from './article'

export interface Batch {
  businessId: string
  name: string
  article: Article
}
