import models from '../models'
import { findOperationByName } from './_utils'

export default {
  Query: {
    operations: async () => {
      const operations = await models.Operation.findAll({
        order: [['name', 'DESC']]
      })
      return operations
    },
    operation: async (_, { name }) => {
      const operation = await models.Operation.findOne({
        where: { name }
      })
      return operation
    }
  },
  Mutation: {
    createOperation: async (_, { name, items }) => {
      const operation = await models.Operation.create(
        {
          name,
          items
        }
      )
      return operation
    },

    updateOperation: async (_, { oldName, newName, items }) => {
      const operation = await findOperationByName(oldName, true)
      operation.name = newName
      operation.items = items
      await operation.save()
      return operation
    },

    deleteOperation: async (_, { name }) => {
      const operation = await findOperationByName(name, true)
      await operation.destroy()
      return true
    }
  }

}
