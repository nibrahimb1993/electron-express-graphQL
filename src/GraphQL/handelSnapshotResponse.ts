import { snapshot } from './__generated__/snapshot'
import { ApolloQueryResult } from 'apollo-client'
import { StoreTerminal, StoreTerminalModel } from '../DB/Models/StoreTerminal'
import { Business, BusinessModel } from '../DB/Models/Business'
import { StoreModel, Store } from '../DB/Models/Store'
import {
  PriceModifiersProvider,
  PriceModifiersProviderModel,
} from '../DB/Models/PriceModifiersProvider'
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
import { ItemModel, Product, StoreKit, Service } from '../DB/Models/Item'

export const handelSnapshotResponse = (
  response: ApolloQueryResult<snapshot>
) => {
  const snapshotRevision = new Date().getTime()
  const storeTerminal = response.data.myTerminal
    ? StoreTerminal.fromSnapshot(response.data.myTerminal)
    : null
  if (storeTerminal)
    StoreTerminalModel.upsert({ ...storeTerminal.toDB(), snapshotRevision })

  const business = response.data.myTerminal?.snapshot?.business
    ? Business.fromSnapshot(response.data.myTerminal?.snapshot?.business)
    : null
  if (business) BusinessModel.upsert({ ...business.toDB(), snapshotRevision })

  const store = response.data.myTerminal?.snapshot?.store
    ? Store.fromSnapshot(response.data.myTerminal?.snapshot?.store)
    : null
  if (store) StoreModel.upsert({ ...store.toDB(), snapshotRevision })

  const location = response.data.myTerminal?.snapshot?.location
    ? StoreLocation.fromSnapshot(response.data.myTerminal?.snapshot?.location)
    : null
  if (location)
    StoreLocationModel.upsert({ ...location.toDB(), snapshotRevision })
  const products = response.data.myTerminal?.snapshot?.products || []
  ItemModel.bulkCreate(
    products.map(product => ({
      ...Product.fromSnapshot(product).toDB(),
      snapshotRevision,
    })),
    { ignoreDuplicates: true }
  )
  const services = response.data.myTerminal?.snapshot?.services || []
  ItemModel.bulkCreate(
    services.map(service => ({
      ...Service.fromSnapshot(service).toDB(),
      snapshotRevision,
    })),
    { ignoreDuplicates: true }
  )
  const kits = response.data.myTerminal?.snapshot?.kits || []
  ItemModel.bulkCreate(
    kits.map(kit => ({
      ...StoreKit.fromSnapshot(kit).toDB(),
      snapshotRevision,
    })),
    { ignoreDuplicates: true }
  )
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
  const drivers = response.data.myTerminal?.snapshot?.location?.drivers || []
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
  const stations = response.data.myTerminal?.snapshot?.location?.stations || []
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
}
