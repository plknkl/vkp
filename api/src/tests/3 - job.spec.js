import { expect } from 'chai'
import * as userApi from './api'

describe('jobs', () => {
  describe('jobs(): [Job]', () => {
    it('returns all jobs', async () => {
      const expectedResult = {
        data: {
          jobs:
          [
            {
              status: 'ready',
              startedAt: null,
              endedAt: null
            }
          ]
        }
      }

      const result = await userApi.jobs()

      expect(result.data).to.have.all.keys(expectedResult)
    })
  })
})
