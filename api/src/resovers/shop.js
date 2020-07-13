import models from '../models'
import { findShopByName, findOperationByName } from './_utils'

export default {
  Query: {
    shops: async () => {
      const shops = await models.Shop.findAll({
        order: [['name', 'DESC']],
        include: [
          models.Actor
        ]
      })
      return shops
    },
    shop: async (_, { name }) => {
      const shop = await models.Shop.findOne({
        where: { name },
        include: [
          models.Actor
        ]
      })
      return shop
    }
  },
  Mutation: {
    createShop: async (_, { name }) => {
      const shop = await models.Shop.create(
        {
          name
        }
      )
      return shop
    },

    updateShop: async (_, { oldName, newName }) => {
      const shop = await findShopByName(oldName, true)
      shop.name = newName
      await shop.save()
      return shop
    },

    deleteShop: async (_, { name }) => {
      const shop = await findShopByName(name, true)
      await shop.destroy()
      return true
    }
  }

}
