import { FetchResult } from 'apollo-link'
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
import { storeTerminalNotification as SubscriptionResponse } from './__generated__/storeTerminalNotification'
import { ItemModel, Product, StoreKit, Service } from '../DB/Models/Item'

export const handelStoreTerminalNotification = (
  response: FetchResult<
    SubscriptionResponse,
    Record<string, any>,
    Record<string, any>
  >
) => {
  const snapshotRevision = new Date().getTime()
  const record = response.data?.storeTerminalNotification?.record
  switch (response.data?.storeTerminalNotification?.action) {
    case 'CREATE':
    case 'UPDATE':
      switch (record?.__typename) {
        // case 'StoreTerminal':
        //   StoreTerminalModel.upsert(
        //     StoreTerminal.fromSnapshot(record).toDB()
        //   )
        //   return
        // case 'Business':
        case 'Store':
          StoreModel.upsert({
            ...Store.fromSnapshot(record).toDB(),
            snapshotRevision,
          })
          return
        case 'StoreLocation':
          StoreLocationModel.upsert({
            ...StoreLocation.fromSnapshot(record).toDB(),
            snapshotRevision,
          })
          return
        case 'Product':
          ItemModel.upsert({
            ...Product.fromSnapshot(record).toDB(),
            snapshotRevision,
          })
          return
        case 'Service':
          ItemModel.upsert({
            ...Service.fromSnapshot(record).toDB(),
            snapshotRevision,
          })
          return
        case 'StoreKit':
          ItemModel.upsert({
            ...StoreKit.fromSnapshot(record).toDB(),
            snapshotRevision,
          })
          return
        // case 'StoreRole':
        // case 'StoreMembership':
        case 'Category':
          CategoryModel.upsert({
            ...Category.fromSnapshot(record).toDB(),
            snapshotRevision,
          })
          return
        case 'StoreOrder':
          OrderModel.upsert({
            ...Order.fromSnapshot(record).toDB(),
            snapshotRevision,
          })
          return
        case 'StoreStation':
          StationModel.upsert({
            ...Station.fromSnapshot(record).toDB(),
            snapshotRevision,
          })
          return
        case 'StoreLocationDriver':
          DriverModel.upsert({
            ...Driver.fromSnapshot(record).toDB(),
            snapshotRevision,
          })
          return
        case 'StoreLocationPaymentMethod':
          PaymentMethodModel.upsert({
            ...PaymentMethod.fromSnapshot(record).toDB(),
            snapshotRevision,
          })
          return
        case 'StoreCustomer':
          CustomerModel.upsert({
            ...Customer.fromSnapshot(record).toDB(),
            snapshotRevision,
          })
          return
        case 'StoreLocationCostCenter':
          CostCenterModel.upsert({
            ...CostCenter.fromSnapshot(record).toDB(),
            snapshotRevision,
          })
          return
        case 'StoreLocationBankAccount':
          BankAccountModel.upsert({
            ...BankAccount.fromSnapshot(record).toDB(),
            snapshotRevision,
          })
          return
        case 'StoreLocationMenu':
          MenuModel.upsert({
            ...Menu.fromSnapshot(record).toDB(),
            snapshotRevision,
          })
          return
        case 'StorePriceModifierProvider':
          PriceModifiersProviderModel.upsert({
            ...PriceModifiersProvider.fromSnapshot(record).toDB(),
            snapshotRevision,
          })
          return
        case 'StorePriceModifierTarget':
          PriceModifiersProviderModel.findByPk(record.provider.id).then(
            providerRecord => {
              if (providerRecord) {
                const provider = providerRecord?.fromDB()
                provider.targets = {
                  entries:
                    provider.targets?.entries?.map(entry => {
                      if (entry.id === record.id) {
                        return record
                      } else {
                        return entry
                      }
                    }) || [],
                  __typename: 'PaginatedStorePriceModifierTargets',
                }
                PriceModifiersProviderModel.upsert({
                  ...provider.toDB(),
                  snapshotRevision,
                })
              }
            }
          )
          return

        case 'StorePriceModifierLocation':
          PriceModifiersProviderModel.upsert({
            ...PriceModifiersProvider.fromSnapshot(record.provider).toDB(),
            snapshotRevision,
          })
          return
        default:
          console.error('not supported record')
      }
      break
    case 'DELETE':
      switch (record?.__typename) {
        case 'Business':
        case 'Store':
        case 'StoreLocation':
        case 'StoreTerminal':
        case 'StoreOrder':
        case 'StoreCustomer':
          console.log('this should not happen')
          break

        case 'Product':
        case 'Service':
        case 'StoreKit':
          ItemModel.destroy({
            where: {
              id: record.id,
            },
          })
          return
        // case 'StoreRole':
        // case 'StoreMembership':
        case 'Category':
          CategoryModel.destroy({
            where: {
              id: record.id,
            },
          })
          return

        case 'StoreStation':
          StationModel.destroy({
            where: {
              id: record.id,
            },
          })

          return
        case 'StoreLocationDriver':
          DriverModel.destroy({
            where: {
              id: record.id,
            },
          })

          return
        case 'StoreLocationPaymentMethod':
          PaymentMethodModel.destroy({
            where: {
              id: record.id,
            },
          })

          return

        case 'StoreLocationCostCenter':
          CostCenterModel.destroy({
            where: {
              id: record.id,
            },
          })

          return
        case 'StoreLocationBankAccount':
          BankAccountModel.destroy({
            where: {
              id: record.id,
            },
          })

          return
        case 'StoreLocationMenu':
          MenuModel.destroy({
            where: {
              id: record.id,
            },
          })

          return
        case 'StorePriceModifierProvider':
          PriceModifiersProviderModel.destroy({
            where: {
              id: record.id,
            },
          })

          return
        case 'StorePriceModifierLocation':
          PriceModifiersProviderModel.destroy({
            where: {
              id: record.provider.id,
            },
          })
          return
        default:
          console.error('not supported record')
      }
      break
    default:
      console.error('not supported action')
      return
  }
}
