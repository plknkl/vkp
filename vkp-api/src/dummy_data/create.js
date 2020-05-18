import models from '../models'

const createStuff = async () => {
  await models.Article.bulkCreate([
    {
      name: 'Nappa'
    },
    {
      name: 'Nubuck'
    }
  ])

  await models.Shift.bulkCreate([
    {
      name: 'Team Rocket'
    },
    {
      name: 'Team Pirates'
    }
  ])

  await models.Operation.bulkCreate([
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
  ])

  await models.Actor.bulkCreate([
    {
      name: 'Brand New Machine',
      status: 'idle',
      operationId: 1
    },
    {
      name: 'Old School Machine',
      status: 'idle',
      operationId: 1
    }
  ])

  // await models.Job.bulkCreate([
  //   {
  //     status: 'ready',
  //     startedAt: null,
  //     endedAt: null
  //   }
  // ])
}

export default createStuff
