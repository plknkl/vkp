import { expect } from 'chai'
import * as testApi from './api'

describe('actors', () => {
  describe('actors(): [Actor]', () => {
    it('returns all actors', async () => {
      const expectedResult = {
        data: {
          actors:
          [
            {
              name: 'Brand New Machine',
              status: 'idle'
            },
            {
              name: 'Old School Machine',
              status: 'idle'
            }
          ]
        }
      }

      const result = await testApi.actors()

      expect(result.data).to.eql(expectedResult)
    })
  })

  describe('updateActorStatus(name: String!, status: String!', () => {
    it('changes an Actor status and returns the newly updated Actor', async () => {
      const expectedResult = {
        data: {
          updateActorStatus: {
            name: 'Brand New Machine',
            status: 'broken'
          }
        }
      }

      const result = await testApi.updateActorStatus(
        {
          name: 'Brand New Machine',
          status: 'broken'
        }
      )

      expect(result.data).to.eql(expectedResult)
    })
  })

  describe('updateActorOperation(actorName: String!, operationName: String!', () => {
    it('changes an Actor\'s Operation and returns the newly updated Actor', async () => {
      const expectedResult = {
        data: {
          updateActorOperation: {
            name: 'Brand New Machine',
            operation: {
              name: 'Lamination'
            }
          }
        }
      }

      const result = await testApi.updateActorOperation(
        {
          actorName: 'Brand New Machine',
          operationName: 'Lamination'
        }
      )

      expect(result.data).to.eql(expectedResult)
    })
  })

  describe(`
    startActorProcess(
      actorName: String!,
      batchBusinessId: String!
    )`, () => {
    it('Creates a new Job, and starts processing a Batch', async () => {
      const expectedResult = {
        data: {
          startActorProcess: {
            name: 'Brand New Machine',
            status: 'working'
          }
        }
      }

      const result = await testApi.startActorProcess(
        {
          actorName: 'Brand New Machine',
          batchBusinessId: '10101',
          articleName: 'Nappa'
        }
      )

      expect(result.data).to.have.all.keys(Object.keys(expectedResult))
    })
  })

  describe(`
    interruptActorProcess(
      actorName: String!,
    )`, () => {
    it('Interrupts an Actor, managing the eventual Job status', async () => {
      const expectedResult = {
        data: {
          interruptActorProcess: {
            name: 'Brand New Machine',
            status: 'idle'
          }
        }
      }

      const result = await testApi.interruptActorProcess(
        {
          actorName: 'Brand New Machine'
        }
      )

      expect(result.data).to.eql(expectedResult)
    })
  })

  describe(`
    finishActorProcess(
      actorName: String!,
    )`, () => {
    it('Finish an Actor, managing the eventual Job status', async () => {
      const expectedResult = {
        data: {
          finishActorProcess: {
            name: 'Brand New Machine',
            status: 'idle'
          }
        }
      }

      const result = await testApi.finishActorProcess(
        {
          actorName: 'Brand New Machine',
          quantity: 420
        }
      )

      expect(result.data).to.eql(expectedResult)
    })
  })

  describe(`
    breakActor(
      actorName: String!,
    )`, () => {
    it('Breaks an Actor, managing the eventual Job status', async () => {
      const expectedResult = {
        data: {
          breakActor: {
            name: 'Brand New Machine',
            status: 'broken'
          }
        }
      }

      const result = await testApi.breakActor(
        {
          actorName: 'Brand New Machine'
        }
      )

      expect(result.data).to.eql(expectedResult)
    })
  })
})
