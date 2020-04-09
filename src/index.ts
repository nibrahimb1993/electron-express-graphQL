import { Express } from 'express'
const { app, BrowserWindow } = require('electron')
const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')

const expressApp: Express = express()

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
declare var __dirname: string
let win

let createWindow = () => {
  win = new BrowserWindow({
    width: 450,
    height: 450,
  })
  win.loadURL(`file://${__dirname}/index.html`)
  win.on('closed', () => {
    win = null
    expressServer.close()
  })
}

app.on('ready', createWindow)
