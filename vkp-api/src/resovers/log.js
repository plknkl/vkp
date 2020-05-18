import models from '../models'
import pubsub, { EVENTS } from '../subscription'

export default {
  Query: {
    logs: async () => {
      const logs = await models.Log.findAll({
        limit: 10,
        order: [['createdAt', 'DESC']],
        include: [
          models.Actor,
          {
            model: models.Job,
            include: [
              {
                model: models.Actor,
                include: [models.Operation]
              },
              {
                model: models.Batch,
                include: [models.Article]
              },
              {
                model: models.Shift
              }
            ]
          }
        ]
      })

      return logs.map((x) => {
        const log = x.dataValues
        if (x.actor) {
          const actor = x.actor.dataValues
          actor.type = 'Actor'
          log.entity = actor
        }
        if (x.job) {
          const job = x.job.dataValues
          job.type = 'Job'
          log.entity = job
        }
        log.time = x.createdAt
        return log
      })
    },
    maintenanceLogs: async () => {
      const logs = await models.Log.findAll({
        limit: 10,
        order: [['createdAt', 'DESC']],
        where: { entityType: 'actor' },
        include: [
          models.Actor,
          {
            model: models.Job,
            include: [
              {
                model: models.Actor,
                include: [models.Operation]
              },
              {
                model: models.Batch,
                include: [models.Article]
              },
              {
                model: models.Shift
              }
            ]
          }
        ]
      })

      return logs.map((x) => {
        const log = x.dataValues
        const actor = x.actor.dataValues
        actor.type = 'Actor'
        log.entity = actor
        log.time = x.createdAt
        return log
      })
    },
    jobLogs: async () => {
      const logs = await models.Log.findAll({
        limit: 20,
        order: [['createdAt', 'DESC']],
        where: { entityType: 'job' },
        include: [
          models.Actor,
          {
            model: models.Job,
            include: [
              {
                model: models.Actor,
                include: [models.Operation]
              },
              {
                model: models.Batch,
                include: [models.Article]
              },
              {
                model: models.Shift
              }
            ]
          }
        ]
      })

      return logs.map((x) => {
        const log = x.dataValues
        if (x.job) {
          const job = x.job.dataValues
          job.type = 'Job'
          log.entity = job
        }
        log.time = x.createdAt
        return log
      })
    }
  },

  LogEntity: {
    __resolveType (obj, context, info) {
      return obj.type
    }
  },

  Subscription: {
    logCreated: {
      subscribe: () => pubsub.asyncIterator(EVENTS.LOG.CREATED)
    }
  }
}
