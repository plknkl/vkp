import moment from 'moment'
import Sequelize from 'sequelize'
import models from '../models'
import pubsub, { EVENTS } from '../subscription'

export default {
  Query: {
    jobs: async (_, { period }) => {
      let periodFilter = {}
      const today = moment().startOf('day')
      const yesterday = moment().startOf('day').subtract(1, 'days')
      const Op = Sequelize.Op

      switch(period) {
        case 0: {
          periodFilter = {
            endedAt: {
              [Op.gt]: today
            }
          }
          break
        }
        case 1: {
          periodFilter = {
            endedAt: {
              [Op.gt]: yesterday,
              [Op.lt]: today,
            }
          }
          break
        }
        default: {
          break
        }
      }

      const jobs = await models.Job.findAll({
        order: [['createdAt', 'DESC']],
        where: periodFilter,
        include: [models.Actor, models.Shift, models.Operation,
          {
            model: models.Batch,
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
