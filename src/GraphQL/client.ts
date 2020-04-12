import { ApolloLink } from 'apollo-link'
import { createSocketLink } from './socket'
import { w3cwebsocket as WebSocket } from 'websocket'
import { Socket } from 'phoenix'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'

const cache = new InMemoryCache()

const Config = {
  WiddeeAPI: 'http://localhost:4000',
  WiddeeAPI_WS: 'ws://localhost:4000/socket',
  debug: true,
}
const buildParams = () => {
  let params = {
    current_terminal: '9AA35D805D924F9892D36073DEF9420E',
  }
  // todo: get the data dynamically
  return params
}
export const generateElectronClient = () => {
  const socket = new Socket(Config.WiddeeAPI_WS, {
    params: buildParams,
    timeout: 120000,
    transport: WebSocket as any,
  })
  const absintheSocketLink = createSocketLink(socket)

  const link = ApolloLink.from([absintheSocketLink])
  const client = new ApolloClient({
    cache: cache,
    link: link,
  })
  socket.connect()

  return { client, disconnectSocket: () => socket.disconnect() }
}
