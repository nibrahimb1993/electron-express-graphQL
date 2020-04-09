// index.ts
import { app, BrowserWindow } from 'electron'
import { Express } from 'express'
import express = require('express')

const expressApp: Express = express()
export const expressServer = expressApp.listen(4100, () => {
  console.log(`Server is listening on port ${4100}`)
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
