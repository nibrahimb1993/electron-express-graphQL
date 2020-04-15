import * as Fragments from './Fragments'
import gql from 'graphql-tag'

export const storeTerminalNotification = gql`
  subscription storeTerminalNotification {
    storeTerminalNotification {
      record {
        ... on StoreTerminal {
          ...storeTerminal
        }
        ... on Business {
          ...business
        }
        ... on Store {
          ...store
        }
        ... on StoreLocation {
          ...location
          paymentMethods {
            ...paymentMethod
          }
        }
        ... on Product {
          ...product
        }
        ... on Service {
          ...service
        }
        ... on StoreKit {
          ...kit
        }
        ... on StoreRole {
          ...role
        }
        ... on StoreMembership {
          ...membership
        }
        ... on Category {
          ...category
        }
        ... on StoreOrder {
          ...StoreOrder
        }
        ... on StoreStation {
          ...station
        }
        ... on StoreLocationDriver {
          ...driver
        }
        ... on StoreLocationPaymentMethod {
          ...paymentMethod
        }
        ... on StoreCustomer {
          ...customer
        }
        ... on StoreLocationCostCenter {
          ...costCenter
        }
        ... on StoreLocationBankAccount {
          ...bankAccount
        }
        ... on StoreLocationMenu {
          ...StoreLocationMenu
        }
        ... on StorePriceModifierProvider {
          ...priceModifiersProviders
        }
        ... on StorePriceModifierTarget {
          _revision
          additionalPrice
          id
          item {
            ... on Product {
              id
            }
            ... on Service {
              id
            }
            ... on StoreKit {
              id
            }
          }
          provider {
            id
          }
        }
        ... on StorePriceModifierLocation {
          id
          provider {
            ...priceModifiersProviders
          }
        }
      }
      action
    }
  }
  ${Fragments.StoreTerminalFragment}
  ${Fragments.BusinessFragment}
  ${Fragments.StoreFragment}
  ${Fragments.LocationFragment}
  ${Fragments.ProductFragment}
  ${Fragments.ServiceFragment}
  ${Fragments.KitFragment}
  ${Fragments.RoleFragment}
  ${Fragments.MembershipFragment}
  ${Fragments.CategoryFragment}
  ${Fragments.StoreOrderFragment}
  ${Fragments.StationFragment}
  ${Fragments.DriverFragment}
  ${Fragments.PaymentMethodFragment}
  ${Fragments.CustomerFragment}
  ${Fragments.BankAccountFragment}
  ${Fragments.CostCenterFragment}
  ${Fragments.StoreLocationMenuFragment}
  ${Fragments.PriceModifiersProviders}
`
export const snapshotQuery = gql`
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
