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
    createOperation: async (_, { name, description }) => {
      const operation = await models.Operation.create(
        {
          name,
          description
        }
      )
      return operation
    },

    updateOperation: async (_, { oldName, newName, description }) => {
      const operation = await findOperationByName(oldName, true)
      operation.name = newName
      operation.description = description
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
