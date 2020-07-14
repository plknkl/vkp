import models from '../models'
import { findShiftByName, findShopByName } from './_utils'
import { Op } from 'sequelize'

export default {
  Query: {
    shifts: async (_, { shopName }) => {
      var shifts = []
      if(shopName) {
        const shop = await findShopByName(shopName) 
        if(!shop) {
          return shifts
        }
        shifts = await models.Shift.findAll({
          order: [['name', 'DESC']],
          include: [
            models.Shop
          ],
          where: {
            shopId: {
              [Op.eq]: shop.id
            }
          }
        })
      } else {
        shifts = await models.Shift.findAll({
          order: [['name', 'DESC']],
          include: [
            models.Shop
          ]
        })
      }
      return shifts
    },
    shift: async (_, { name }) => {
      const shift = await models.Shift.findOne({
        where: { name },
        include: [
          models.Shop
        ]
      })
      return shift
    }
  },
  Mutation: {
    createShift: async (_, { name, shopName }) => {
      const shop = await findShopByName(shopName)
      const shift = await models.Shift.create(
        {
          name,
          shopId: shop.id
        }
      )
      return shift
    },

    updateShift: async (_, { oldName, newName, shopName }) => {
      const shift = await findShiftByName(oldName, true)
      const shop = await findShopByName(shopName)
      shift.name = newName
      shift.shopId = shop.id
      await shift.save()
      return shift
    },

    deleteShift: async (_, { name }) => {
      const shift = await findShiftByName(name, true)
      await shift.destroy()
      return true
    }
  }

}
