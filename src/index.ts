import { Express } from 'express'
import 'cross-fetch/polyfill'
import { generateElectronClient } from './GraphQL/client'
import { setupDB } from './DB/Models'
import { PriceModifiersProviderModel } from './DB/Models/PriceModifiersProvider'
import { StoreModel } from './DB/Models/Store'

const { app, BrowserWindow } = require('electron')
const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')

const expressApp: Express = express()

const { client, disconnectSocket } = generateElectronClient()
const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`

const resolvers = {
  Query: {
    hello: () => 'world',
  },
}
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.applyMiddleware({ app: expressApp, path: '/graphql' })

const expressServer = expressApp.listen(4100, () => {
  console.log(`🚀 Server ready at http://localhost:4100${server.graphqlPath}`)
})
expressApp.get('/', (_, res) => {
  PriceModifiersProviderModel.findAll()
    .then(users => {
      users.forEach(user => {
        console.log({ record: user.fromDB() })
      })
      // console.log({ users })
      return res.json({
        message: 'success',
        data: users,
      })
    })
    .catch(error => {
      console.log({ error })
      return res.status(400).json({ error })
    })
})
declare var __dirname: string
let win

let createWindow = async () => {
  await setupDB()
  win = new BrowserWindow({
    width: 450,
    height: 450,
  })
  win.loadURL(`file://${__dirname}/index.html`)
  win.on('closed', () => {
    win = null
    expressServer.close()
    disconnectSocket()
  })
}

app.on('ready', createWindow)
