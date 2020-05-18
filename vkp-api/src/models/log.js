import pubsub, { EVENTS } from '../subscription'
import models from './index'

const logEntities = [
  'actor',
  'job'
]

const assembleLog = async (log) => {
  if (log.dataValues.entityType === 'actor') {
    let actor = await models.Actor.findOne({
      where: { id: log.dataValues.actorId },
      include: [
        models.Operation
      ]
    })
    actor = actor.dataValues
    actor.type = 'Actor'
    log.entity = actor
    return log
  }

  if (log.dataValues.entityType === 'job') {
    let job = await models.Job.findOne({
      where: { id: log.dataValues.jobId },
      include: [
        {
          model: models.Actor,
          include: [
            models.Operation
          ]
        },
        {
          model: models.Batch,
          include: [
            models.Article
          ]
        }
      ]
    })
    job = job.dataValues
    job.type = 'Job'
    log.entity = job
    return log
  }
}

const log = (sequelize, DataTypes) => {
  const Log = sequelize.define('log', {
    entityType: {
      type: DataTypes.ENUM(logEntities),
      validate: {
        notEmpty: true
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  })

  Log.associate = models => {
    Log.belongsTo(models.Actor)
    Log.belongsTo(models.Job)
  }

  Log.addHook('afterCreate', async (log) => {
    pubsub.publish(EVENTS.LOG.CREATED, {
      logCreated: assembleLog(log)
    })
  })

  return Log
}

export default log
