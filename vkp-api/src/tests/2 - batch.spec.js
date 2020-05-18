import { expect } from 'chai'
import * as userApi from './api'

describe('batches', () => {
  describe('batches(): [Batch]', () => {
    it('returns all batches', async () => {
      const expectedResult = {
        data: {
          batches:
          [
            {
              businessId: 10101
            }
          ]
        }
      }

      const result = await userApi.batches()

      expect(result.data).to.eql(expectedResult)
    })
  })
})
