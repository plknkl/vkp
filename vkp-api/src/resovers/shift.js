import models from '../models'
import { findShiftByName } from './_utils'

export default {
  Query: {
    shifts: async () => {
      const shifts = await models.Shift.findAll({
        order: [['name', 'DESC']]
      })
      return shifts
    },
    shift: async (_, { name }) => {
      const shift = await models.Shift.findOne({
        where: { name }
      })
      return shift
    }
  },
  Mutation: {
    createShift: async (_, { name }) => {
      const shift = await models.Shift.create(
        {
          name
        }
      )
      return shift
    },

    updateShift: async (_, { oldName, newName }) => {
      const shift = await findShiftByName(oldName, true)
      shift.name = newName
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
