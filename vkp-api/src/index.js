import 'dotenv/config'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import models, { sequelize } from './models'
import createStuff from './dummy_data'
import schema from './schema'
import resolvers from './resovers'
import http from 'http'

const app = express()

const isTest = !!process.env.TEST_DATABASE

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  subscriptions: true,
  context: async ({ req, connection }) => {
    if (connection) {
      return { models }
    }

    if (req) {
      return { models }
    }
  }
})

server.applyMiddleware({ app, path: '/graphql' })

const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

sequelize.sync({ force: isTest }).then(async () => {
  if (isTest) {
    createStuff()
  }
  httpServer.listen({ port: 8000 }, () => {
    console.log('Server running on 8000...')
  })
})
