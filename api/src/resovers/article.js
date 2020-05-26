import models from '../models'

import { findArticleByName } from './_utils'

export default {
  Query: {
    articles: async (_, __, { models }) => {
      const articles = await models.Article.findAll({
        order: [['updatedAt', 'DESC']]
      })
      return articles
    },
    article: async (_, { name }, { models }) => {
      const article = await models.Article.findOne({
        where: { name }
      })
      return article
    }
  },

  Mutation: {
    createArticle: async (_, { name }) => {
      const article = await models.Article.create(
        {
          name
        }
      )
      return article
    },

    updateArticle: async (_, { oldName, newName }) => {
      const article = await findArticleByName(oldName, true)
      article.name = newName
      await article.save()
      return article
    },

    deleteArticle: async (_, { name }) => {
      const article = await findArticleByName(name, true)
      await article.destroy()
      return true
    }
  }
}
