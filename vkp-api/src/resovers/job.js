import models from '../models'
import pubsub, { EVENTS } from '../subscription'

export default {
  Query: {
    jobs: async () => {
      const jobs = await models.Job.findAll({
        order: [['createdAt', 'DESC']],
        include: [models.Actor, models.Shift,
          {
            model: models.Batch,
            include: models.Article
          }
        ]
      })
      return jobs
    }
  },
  Subscription: {
    jobUpdated: {
      subscribe: () => pubsub.asyncIterator(EVENTS.JOB.UPDATED)
    }
  }
}
