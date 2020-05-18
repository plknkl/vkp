import models from '../models'

export default {
  Query: {
    batches: async () => {
      const batches = await models.Batch.findAll({
        order: [['businessId', 'DESC']],
        include: [models.Article]
      })
      return batches
    }
  }
}
