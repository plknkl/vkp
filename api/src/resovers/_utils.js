import models from '../models'
import pubsub, { EVENTS } from '../subscription'

const findActor = async (name, model = false) => {
  const actor = await models.Actor.findOne({
    where: {
      name
    }
  })
  return model ? actor : actor.dataValues
}

const findBatch = async (batchBusinessId, model = false) => {
  const batch = await models.Batch.findOne({
    where: {
      businessId: batchBusinessId
    }
  })
  return model ? batch : batch.dataValues
}

const findOperation = async (operationId, model = false) => {
  const operation = await models.Operation.findOne({
    where: { id: operationId }
  })
  return model ? operation : operation.dataValues
}

const findOperationByName = async (operationName, model = false) => {
  const operation = await models.Operation.findOne({
    where: { name: operationName }
  })
  return model ? operation : operation.dataValues
}

const findShiftByName = async (shiftName, model = false) => {
  const shift = await models.Shift.findOne({
    where: { name: shiftName }
  })
  return model ? shift : shift.dataValues
}

const findJob = async (id, model = false) => {
  const job = await models.Job.findOne({
    where: { id },
    include: [models.Actor, models.Shift,
      {
        model: models.Batch,
        include: models.Article
      }
    ]
  })
  return model ? job : job.dataValues
}

const findArticleByName = async (articleName, model = false) => {
  const article = await models.Article.findOne({
    where: { name: articleName }
  })
  return model ? article : article.dataValues
}

const findActorsJob = async (actorId, model = false) => {
  const job = await models.Job.findOne({
    where: { actorId },
    order: [['createdAt', 'DESC']]
  })

  return model ? job : job.dataValues
}

const createNewJob = async (actorId, batchId, operationId, shiftId, model = false) => {
  const job = await models.Job.create({
    startedAt: Date.now(),
    operationId,
    actorId,
    batchId,
    shiftId
  })

  // needed to trigger the logger, which only triggers on save
  job.status = 'processing'
  await job.save()

  pubsub.publish(EVENTS.JOB.UPDATED, {
    jobUpdated: findJob(job.id)
  })

  return model ? job : job.dataValues
}

const interruptActorsJob = async (actor) => {
  const job = await findActorsJob(actor.id, true)

  if (job && job.status === 'processing') {
    job.status = 'interrupted'
    job.endedAt = new Date()
    await job.save()
    pubsub.publish(EVENTS.JOB.UPDATED, {
      jobUpdated: findJob(job.id)
    })
    return job.dataValues
  }
}

const createBatch = async (businessId, articleId) => {
  const batch = await models.Batch.create({
    businessId,
    articleId
  })

  return batch
}

const finishActorsJob = async (actor, quantity) => {
  const job = await findActorsJob(actor.id, true)
  if (job && job.status === 'processing') {
    job.status = 'finished'
    if (quantity) {
      job.quantity = quantity
      job.endedAt = new Date()
    }
    await job.save()
    pubsub.publish(EVENTS.JOB.UPDATED, {
      jobUpdated: findJob(job.id)
    })
  }

  return job.dataValues
}

export {
  findActor,
  findBatch,
  findOperation,
  findOperationByName,
  findShiftByName,
  findActorsJob,
  createNewJob,
  interruptActorsJob,
  finishActorsJob,
  findArticleByName,
  findJob,
  createBatch
}