// index.ts
import { app, BrowserWindow } from 'electron'

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
  })
}

app.on('ready', createWindow)
