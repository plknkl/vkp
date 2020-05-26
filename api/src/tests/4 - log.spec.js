import { expect } from 'chai'
import * as testApi from './api'

describe('logs', () => {
  describe('logs(): [Log]', () => {
    it('returns all logs', async () => {
      const result = await testApi.logs()
      expect(result.data.data.logs.length).to.eql(7)
    })
  })
})
