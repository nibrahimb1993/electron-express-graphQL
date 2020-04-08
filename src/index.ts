// index.ts
import { app, BrowserWindow } from 'electron'
import express from 'express'

const expressApp = express()

declare var __dirname: string
let win
expressApp.use(express.json())
const server = expressApp.listen(4100, () => {
  console.log(`Server is listening on port ${4100}`)
})
let createWindow = () => {
  win = new BrowserWindow({
    width: 450,
    height: 450,
  })
  win.loadURL(`file://${__dirname}/index.html`)
  console.log('test')
  win.on('closed', () => {
    win = null
    server.close()
  })
}

app.on('ready', createWindow)
