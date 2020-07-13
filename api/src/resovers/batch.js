import models from '../models'

export default {
  Query: {
    batches: async () => {
      const batches = await models.Batch.findAll({
        include: [models.Article]
      })
      return batches
    }
  }
}
