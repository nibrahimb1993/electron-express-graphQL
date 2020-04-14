import { ApolloLink } from 'apollo-link'
import { createSocketLink } from './socket'
import { w3cwebsocket as WebSocket } from 'websocket'
import { Socket } from 'phoenix'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import * as Fragments from './Fragments'

import { get } from 'lodash'
import { StoreTerminal, StoreTerminalModel } from '../DB/Models/StoreTerminal'
import { Business, BusinessModel } from '../DB/Models/Business'
import { StoreModel, Store } from '../DB/Models/Store'
import {
  PriceModifiersProvider,
  PriceModifiersProvidersModel,
} from '../DB/Models/PriceModifiersProvider'
import { snapshot } from './__generated__/snapshot'

const { gql } = require('apollo-server-express')

const cache = new InMemoryCache()

const snapshotQuery = gql`
  query snapshot {
    myTerminal {
      ...storeTerminal
      messagesCount
      snapshot {
        business {
          ...business
        }
        store {
          ...store
        }
        priceModifiersProviders {
          ...priceModifiersProviders
        }
        location {
          ...location
          stations {
            ...station
          }
          paymentMethods {
            ...paymentMethod
          }
          drivers {
            ...driver
          }
          bankAccounts {
            entries {
              ...bankAccount
            }
          }
          costCenters {
            entries {
              ...costCenter
            }
          }
          menus {
            entries {
              ...StoreLocationMenu
            }
          }
        }
        products {
          ...product
        }
        services {
          ...service
        }
        kits {
          ...kit
        }
        roles {
          ...role
        }
        categories {
          ...category
        }
        orders {
          ...StoreOrder
        }
        customers {
          ...customer
        }
        revision
      }
    }
  }
  ${Fragments.PriceModifiersProviders}
  ${Fragments.BusinessFragment}
  ${Fragments.StoreFragment}
  ${Fragments.LocationFragment}
  ${Fragments.ProductFragment}
  ${Fragments.ServiceFragment}
  ${Fragments.KitFragment}
  ${Fragments.RoleFragment}
  ${Fragments.CategoryFragment}
  ${Fragments.StoreOrderFragment}
  ${Fragments.StationFragment}
  ${Fragments.DriverFragment}
  ${Fragments.PaymentMethodFragment}
  ${Fragments.CustomerFragment}
  ${Fragments.BankAccountFragment}
  ${Fragments.CostCenterFragment}
  ${Fragments.StoreTerminalFragment}
  ${Fragments.StoreLocationMenuFragment}
`
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
  client
    .query({
      query: snapshotQuery,
    })
    .then((response: { data: snapshot }) => {
      console.log('snapshot response success')

      const storeTerminal = response.data.myTerminal
        ? StoreTerminal.fromSnapshot(response.data.myTerminal)
        : null
      const business = response.data.myTerminal?.snapshot?.business
        ? Business.fromSnapshot(response.data.myTerminal?.snapshot?.business)
        : null
      const store = response.data.myTerminal?.snapshot?.store
        ? Store.fromSnapshot(response.data.myTerminal?.snapshot?.store)
        : null
      const priceModifiersProviders =
        response.data.myTerminal?.snapshot?.priceModifiersProviders || []

      PriceModifiersProvidersModel.bulkCreate(
        priceModifiersProviders.map(item =>
          PriceModifiersProvider.fromSnapshot(item).toDB()
        ),
        { ignoreDuplicates: true }
      )
      if (business) BusinessModel.upsert(business.toDB())
      if (storeTerminal) StoreTerminalModel.upsert(storeTerminal.toDB())
      if (store) StoreModel.upsert(store.toDB())
    })
    .catch(error => {
      console.log('something went wrong')
      console.log({ error })
    })

  return { client, disconnectSocket: () => socket.disconnect(), socket }
}
