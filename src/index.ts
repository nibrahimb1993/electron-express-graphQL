import { Express } from 'express'
import db from './DB'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import 'cross-fetch/polyfill'

const { ApolloClient } = require('apollo-client')
const { app, BrowserWindow } = require('electron')
const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')

const expressApp: Express = express()
const cache = new InMemoryCache()
const link = new HttpLink({
  uri: 'http://localhost:4100/graphql',
})
const client = new ApolloClient({
  cache: cache,
  link: link,
})
const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`
const q = gql`
  query test {
    hello
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
  const sql = 'select * from user'
  client
    .query({
      query: q,
    })
    .then((response: any) => {
      console.log(response)
    })
    .catch((error: any) => {
      console.log({ error })
    })
  db.all(sql, {}, (err, rows) => {
    console.log({ err, rows })
    if (err) {
      console.log({ err })
      return res.status(400).json({ error: err.message })
    }
    return res.json({
      message: 'success',
      data: rows,
    })
  })
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
