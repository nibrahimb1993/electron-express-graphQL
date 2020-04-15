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
  PriceModifiersProviderModel,
} from '../DB/Models/PriceModifiersProvider'
import { snapshot } from './__generated__/snapshot'
import { BankAccountModel, BankAccount } from '../DB/Models/BankAccount'
import { CategoryModel, Category } from '../DB/Models/Category'
import { CostCenterModel, CostCenter } from '../DB/Models/CostCenter'
import { CustomerModel, Customer } from '../DB/Models/Customer'
import { DriverModel, Driver } from '../DB/Models/Driver'
import { MenuModel, Menu } from '../DB/Models/Menu'
import { OrderModel, Order } from '../DB/Models/Order'
import { PaymentMethodModel, PaymentMethod } from '../DB/Models/PaymentMethod'
import { StationModel, Station } from '../DB/Models/Station'
import { StoreLocation, StoreLocationModel } from '../DB/Models/StoreLocation'

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
      const snapshotRevision = new Date().getTime()
      const storeTerminal = response.data.myTerminal
        ? StoreTerminal.fromSnapshot(response.data.myTerminal)
        : null
      if (storeTerminal)
        StoreTerminalModel.upsert({ ...storeTerminal.toDB(), snapshotRevision })

      const business = response.data.myTerminal?.snapshot?.business
        ? Business.fromSnapshot(response.data.myTerminal?.snapshot?.business)
        : null
      if (business)
        BusinessModel.upsert({ ...business.toDB(), snapshotRevision })

      const store = response.data.myTerminal?.snapshot?.store
        ? Store.fromSnapshot(response.data.myTerminal?.snapshot?.store)
        : null
      if (store) StoreModel.upsert({ ...store.toDB(), snapshotRevision })

      const location = response.data.myTerminal?.snapshot?.location
        ? StoreLocation.fromSnapshot(
            response.data.myTerminal?.snapshot?.location
          )
        : null
      if (location)
        StoreLocationModel.upsert({ ...location.toDB(), snapshotRevision })
      const bankAccounts =
        response.data.myTerminal?.snapshot?.location?.bankAccounts.entries || []
      BankAccountModel.bulkCreate(
        bankAccounts.map(account => ({
          ...BankAccount.fromSnapshot(account).toDB(),
          snapshotRevision,
        })),
        { ignoreDuplicates: true }
      )
      const categories = response.data.myTerminal?.snapshot?.categories || []
      CategoryModel.bulkCreate(
        categories.map(category => ({
          ...Category.fromSnapshot(category).toDB(),
          snapshotRevision,
        })),
        { ignoreDuplicates: true }
      )
      const costCenters =
        response.data.myTerminal?.snapshot?.location?.costCenters.entries || []
      CostCenterModel.bulkCreate(
        costCenters.map(center => ({
          ...CostCenter.fromSnapshot(center).toDB(),
          snapshotRevision,
        })),
        { ignoreDuplicates: true }
      )
      const customers = response.data.myTerminal?.snapshot?.customers || []
      CustomerModel.bulkCreate(
        customers.map(customer => ({
          ...Customer.fromSnapshot(customer).toDB(),
          snapshotRevision,
        })),
        { ignoreDuplicates: true }
      )
      const drivers =
        response.data.myTerminal?.snapshot?.location?.drivers || []
      DriverModel.bulkCreate(
        drivers.map(driver => ({
          ...Driver.fromSnapshot(driver).toDB(),
          snapshotRevision,
        })),
        { ignoreDuplicates: true }
      )
      const menus =
        response.data.myTerminal?.snapshot?.location?.menus.entries || []
      MenuModel.bulkCreate(
        menus.map(menu => ({
          ...Menu.fromSnapshot(menu).toDB(),
          snapshotRevision,
        })),
        { ignoreDuplicates: true }
      )
      const orders = response.data.myTerminal?.snapshot?.orders || []
      OrderModel.bulkCreate(
        orders.map(order => ({
          ...Order.fromSnapshot(order).toDB(),
          snapshotRevision,
        })),
        { ignoreDuplicates: true }
      )
      const paymentMethods =
        response.data.myTerminal?.snapshot?.location?.paymentMethods || []
      PaymentMethodModel.bulkCreate(
        paymentMethods.map(record => ({
          ...PaymentMethod.fromSnapshot(record).toDB(),
          snapshotRevision,
        })),
        { ignoreDuplicates: true }
      )
      const stations =
        response.data.myTerminal?.snapshot?.location?.stations || []
      StationModel.bulkCreate(
        stations.map(record => ({
          ...Station.fromSnapshot(record).toDB(),
          snapshotRevision,
        })),
        { ignoreDuplicates: true }
      )

      const priceModifiersProviders =
        response.data.myTerminal?.snapshot?.priceModifiersProviders || []

      PriceModifiersProviderModel.bulkCreate(
        priceModifiersProviders.map(item => ({
          ...PriceModifiersProvider.fromSnapshot(item).toDB(),
          snapshotRevision,
        })),
        { ignoreDuplicates: true }
      )
    })
    .catch(error => {
      console.log('something went wrong')
      console.log({ error })
    })

  return { client, disconnectSocket: () => socket.disconnect(), socket }
}
