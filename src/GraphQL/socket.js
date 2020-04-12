import * as AbsintheSocket from '@absinthe/socket'
import { createAbsintheSocketLink } from '@absinthe/socket-apollo-link'
export const createSocketLink = socket =>
  createAbsintheSocketLink(
    AbsintheSocket.create(socket)
    // error => {
    //   console.error('absinthe error', { error })
    // }
  )
