import pubsub, { EVENTS } from '../subscription'
import { Op } from 'sequelize'

import {
  findActor, findArticleByName, findOperation,
  createNewJob, findOperationByName, interruptActorsJob,
  finishActorsJob, createBatch, findShiftByName, findShopByName,
  findActorsJob
} from './_utils'

export default {
  Query: {
    actors: async (_, { shopName }, { models }) => {
      var actors = []
      if(shopName) {
        const shop = await findShopByName(shopName) 
        if(!shop) {
          return actors
        }
        actors = await models.Actor.findAll({
          order: [['updatedAt', 'DESC']],
          include: [
            models.Operation,
            models.Shop
          ],
          where: {
            shopId: {
              [Op.eq]: shop.id
            }
          }
        })
      } else {
        actors = await models.Actor.findAll({
          order: [['updatedAt', 'DESC']],
          include: [
            models.Operation,
            models.Shop
          ]
        })
      }
      return actors.map( async (actor) => {
        const job = await findActorsJob(actor.id)
        actor.currentJob = job
        return actor
      })
    },
    actor: async (_, { name, operationName }, { models }) => {
      if (name == 'new') {
        return null
      }
      const operation = await findOperationByName(operationName)
      const actor = await models.Actor.findOne({
        where: { name, operationId: operation.id },
        include: [
          models.Operation,
          models.Shop
        ]
      })
      const job = await findActorsJob(actor.id)
      actor.currentJob = job
      return actor
    },
  },

  Mutation: {
    createActor: async (_, { name, operationName, shopName }, { models }) => {
      const operation = await findOperationByName(operationName)
      const shop = await findShopByName(shopName)
      const actor = await models.Actor.create({
        name,
        operationId: operation.id,
        shopId: shop.id,
        status: 'idle'
      })
      return actor
    },

    updateActor: async (_, { oldName, newName, operationName, shopName }, { models }) => {
      const operation = await findOperationByName(operationName)
      const shop = await findShopByName(shopName)
      const actor = await findActor(oldName, true)
      actor.name = newName
      actor.operationId = operation.id
      actor.shopId = shop.id
      await actor.save()
      return actor
    },

    deleteActor: async (_, { name, operationName }) => {
      const actor = await findActor(name, operationName, true)
      await actor.destroy()
      return true
    },

    updateActorStatus: async (_, { name, operationName, status }, { models }) => {
      const actor = await findActor(name, operationName, true)
      actor.status = status
      await actor.save()
      await interruptActorsJob(actor)

      pubsub.publish(EVENTS.ACTOR.UPDATED, {
        actorUpdated: actor
      })
      return actor
    },

    startActorProcess: async (_, { actorName, operationName, details, shiftName }, { models }) => {
      // find the actor
      let actor = await findActor(actorName, operationName, true)

      if (!actor.operationId) {
        throw new Error('The actor has no assigned operation.')
      }

      // find the operation
      const operation = await findOperation(actor.operationId)

      // find article
      // const article = await findArticleByName(articleName)

      // find shift
      const shift = await findShiftByName(shiftName)

      // create new batch
      const batch = await createBatch(details)

      // create a new Job
      const job = await createNewJob(actor.id, batch.id, operation.id, shift.id)

      if (job) {
        actor.status = 'working'
        await actor.save()
      }

      actor = actor.dataValues
      actor.currentJob = job
      actor.operation = operation

      pubsub.publish(EVENTS.ACTOR.UPDATED, {
        actorUpdated: actor
      })

      return actor
    },

    interruptActorProcess: async (_, { actorName, operationName }) => {
      const actor = await findActor(actorName, operationName, true)

      actor.status = 'idle'
      await actor.save()

      await interruptActorsJob(actor)

      pubsub.publish(EVENTS.ACTOR.UPDATED, {
        actorUpdated: actor
      })

      return actor
    },

    finishActorProcess: async (_, { actorName, operationName, quantity }) => {
      const actor = await findActor(actorName, operationName, true)

      actor.status = 'idle'
      await actor.save()

      finishActorsJob(actor, quantity)

      pubsub.publish(EVENTS.ACTOR.UPDATED, {
        actorUpdated: actor
      })

      return actor
    },

    breakActor: async (_, { actorName, operationName }) => {
      const actor = await findActor(actorName, operationName, true)

      actor.status = 'broken'
      await actor.save()

      await interruptActorsJob(actor)

      return actor
    },

    updateActorOperation: async (_, { actorName, operationName }) => {
      const operation = await findOperationByName(operationName)
      let actor = await findActor(actorName, true)
      if (actor) {
        actor.operationId = operation.id
        await actor.save()
      }
      actor = actor.dataValues
      actor.operation = operation
      return actor
    }
  },

  Subscription: {
    actorUpdated: {
      subscribe: () => pubsub.asyncIterator(EVENTS.ACTOR.UPDATED)
    }
  }
}
