import { expect } from 'chai'
import * as userApi from './api'

describe('operations', () => {
  describe('operations(): [Operation]', () => {
    it('returns all operations', async () => {
      const expectedResult = {
        data: {
          operations:
          [
            {
              name: 'Softening',
              description: 'A transformation to make it softer',
              unit: 'kg'
            },
            {
              name: 'Lamination',
              description: 'Addition of transparent plastic layer',
              unit: 'm2'
            }
          ]
        }
      }

      const result = await userApi.operations()

      expect(result.data).to.eql(expectedResult)
    })
  })
})
