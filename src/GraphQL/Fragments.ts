import gql from 'graphql-tag'
export const StoreTerminalFragment = gql`
  fragment storeTerminal on StoreTerminal {
    id
    _revision
    code
    nameTranslation {
      arSa
      enUs
    }
    keepLocalDataDuration
    location {
      id
    }
  }
`
export const BusinessFragment = gql`
  fragment business on Business {
    id
    name
    country {
      id
      nameTranslation {
        arSa
        enUs
      }
    }
    invoiceSettings: setting(
      key: "com.widdee.businesses.pos.invoiceSettings"
      target: BUSINESS
    ) {
      id
      value
    }
    theme: setting(
      key: "com.widdee.businesses.business.theme"
      target: BUSINESS
    ) {
      id
      value
    }
    defaultVatLabel: defaultLocalSalesVatLabel {
      id
      nameTranslation {
        arSa
        enUs
      }
      percentage
    }
    currency
    receiptMessage
    vatNumber
    avatar {
      url
    }
    _revision
  }
`
export const StoreFragment = gql`
  fragment store on Store {
    id
    setting {
      posLayout
      allowDecimalQuantityForServices
      allowDecimalQuantity
      numberOfInvoiceCopies
      id
      keepDataDuration
      numberOfDecimalsForPrice
      numberOfDecimalsForQuantity
      discountType
      barcodeReaderNumberOfDecimalsForQuantity
      barcodeReaderNumberOfDecimalsForPrice
      barcodeReaderNumberOfDigitsForPrice
      barcodeReaderNumberOfDigitsForQuantity
      barcodeReaderSkuReaderWithValidationNumber
      kitLinesVisibilityInCart
      kitLinesVisibilityInInvoice
      kitLinesVisibilityInStationInvoice
      showCountersButtonsInQuantityField
      requireReasonForBillModification
      discountPosition
      enableTills
      logoHeight
      logoWidth
      posThermalInvoiceLayout
      enableBillingOrders
      printPaymentMethods
    }
    _revision
  }
`
export const PaymentMethodFragment = gql`
  fragment paymentMethod on StoreLocationPaymentMethod {
    _revision
    id
    active
    nameTranslation {
      arSa
      enUs
    }
    paymentMethodType: type
    defaultForReturn
  }
`
export const BankAccountFragment = gql`
  fragment bankAccount on StoreLocationBankAccount {
    id
    _revision
    bankAccount {
      id
      nameTranslation {
        enUs
        arSa
      }
      code
    }
    membership {
      id
    }
  }
`
export const CostCenterFragment = gql`
  fragment costCenter on StoreLocationCostCenter {
    id
    _revision
    nameTranslation {
      enUs
      arSa
    }
    group {
      nameTranslation {
        enUs
        arSa
      }
      active
      id
      lines {
        percentage
        costCenter {
          id
          nameTranslation {
            enUs
            arSa
          }
          code
        }
      }
    }
  }
`
export const PriceModifiersProviders = gql`
  fragment priceModifiersProviders on StorePriceModifierProvider {
    _revision
    id
    nameTranslation {
      arSa
      enUs
    }
    targets {
      entries {
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
      }
    }
  }
`
export const LocationFragment = gql`
  fragment location on StoreLocation {
    id
    _revision
    code
    type
    nameTranslation {
      arSa
      enUs
    }
    inventoryPhysicalLocation {
      id
      nameTranslation {
        arSa
        enUs
      }
      code
      inventory {
        id
      }
    }
    deliveryService {
      ...service
    }
  }
`
export const StationFragment = gql`
  fragment station on StoreStation {
    id
    name
    printerIp
    numberOfCopies
    categories {
      id
    }
    _revision
  }
`
export const DriverFragment = gql`
  fragment driver on StoreLocationDriver {
    id
    name
    active
    _revision
  }
`
export const MembershipFragment = gql`
  fragment membership on StoreMembership {
    id
    pin
    active
    businessMembership {
      id
      permissions
    }
    code
    _revision
    user {
      id
      name
    }
  }
`
export const RoleFragment = gql`
  fragment role on StoreRole {
    id
    role
    valid
    _revision
    membership {
      id
      businessMembership {
        id
        permissions
      }
      pin
      active
      code
      _revision
      user {
        id
        name
      }
    }
  }
`

export const ProductFragment = gql`
  fragment product on Product {
    id
    allowConsumptionDecimals
    _revision
    priceList {
      id
      price
      quantity
    }
    nameTranslation {
      arSa
      enUs
    }
    albumCover {
      id
      url
    }
    units(type: SALE) {
      id
      nameTranslation {
        arSa
        enUs
      }
      rate
      sku
    }
    itemPrice
    listed
    vatPercentage: localSalesVatPercentage
    vatLabel: localSalesVatLabel {
      id
    }
    sku
    upc
    sellable
    categories {
      id
      root {
        id
      }
    }
  }
`
export const ServiceFragment = gql`
  fragment service on Service {
    id
    _revision
    nameTranslation {
      arSa
      enUs
    }
    albumCover {
      id
      url
    }
    priceList {
      id
      price
      quantity
    }
    price
    listed
    vatPercentage: localSalesVatPercentage
    vatLabel: localSalesVatLabel {
      id
    }
    sku
    sellable
    categories {
      id
      root {
        id
      }
    }
  }
`
// you must include product fragment and service fragment
export const KitFragment = gql`
  fragment kit on StoreKit {
    id
    name
    nameTranslation {
      arSa
      enUs
    }
    sku
    minimumNumberOfItems
    maximumNumberOfItems
    startingPrice
    listed
    categories {
      id
      root {
        id
      }
    }
    albumCover {
      id
      url
    }
    _revision
    revision
    lines {
      id
      index
      choice {
        id
        nameTranslation {
          arSa
          enUs
        }
        options {
          id
          additionalPrice
          index
          unit {
            id
            nameTranslation {
              arSa
              enUs
            }
            rate
            defaultForSales
          }
          service {
            id
            nameTranslation {
              arSa
              enUs
            }
            albumCover {
              id
              url
            }
          }
          product {
            id
            allowConsumptionDecimals
            nameTranslation {
              arSa
              enUs
            }
            albumCover {
              id
              url
            }
          }
        }
      }
      service {
        id
        nameTranslation {
          arSa
          enUs
        }
      }
      product {
        id
        allowConsumptionDecimals
        nameTranslation {
          arSa
          enUs
        }
      }
      unit {
        id
        rate
        nameTranslation {
          arSa
          enUs
        }
      }
      minimumQuantity
      maximumQuantity
      defaultQuantity
      price
    }
    vatPercentage: localSalesVatPercentage
    vatLabel: localSalesVatLabel {
      id
    }
  }
`
export const CategoryFragment = gql`
  fragment category on Category {
    nameTranslation {
      arSa
      enUs
    }
    id
    icon
    _revision
    parent {
      id
    }
    root {
      id
    }
  }
`
export const CustomerFragment = gql`
  fragment customer on StoreCustomer {
    id
    customerName: name
    phone
    vatNumber
    _revision
    addresses {
      id
      name
      address
    }
  }
`

export const StoreOrderFragment = gql`
  fragment StoreOrder on StoreOrder {
    id
    _revision
    at
    due
    priceModifierProvider {
      id
      nameTranslation {
        arSa
        enUs
      }
      targets {
        entries {
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
      }
    }
    orderType
    totalDiscount
    totalReturned
    serialNumber
    stage
    subtotal
    total
    totalPayments
    totalVat
    note
    itemsCount
    status
    billVersion
    billNumber
    customer {
      id
      name
      vatNumber
      phone
    }
    returnPaymentMethod {
      id
    }
    delivery {
      address
      customer
      driver {
        id
        name
      }
      id
      notes
      phoneNumber
    }
    inventoryPhysicalLocation {
      id
      code
      nameTranslation {
        ...translation
      }
    }
    items {
      ...StoreOrderItem
    }
    location {
      id
      code
      nameTranslation {
        ...translation
      }
    }
    membership {
      id
      user {
        id
        name
      }
    }
    payments {
      id
      amount
      transactionNumber
      type
    }
    returns {
      id
      serialNumber
      inventoryPhysicalLocation {
        id
        code
        nameTranslation {
          ...translation
        }
      }
      membership {
        id
        user {
          id
          name
        }
      }
    }
    terminal {
      id
      code
      nameTranslation {
        ...translation
      }
    }
    history {
      ...StoreOrderHistory
    }
  }
  fragment StoreOrderHistory on StoreOrderHistory {
    at
    billVersion
    id
    item {
      id
    }
    kit {
      id
    }
    membership {
      id
    }
    product {
      id
    }
    quantity
    reason
    reason
    service {
      id
    }
    targetOrder {
      id
    }
    terminal {
      id
    }
    type
    waste
  }
  fragment StoreOrderItem on StoreOrderItem {
    note
    id
    billVersion
    price
    basePrice
    additionalPrice
    priceModifierTarget {
      id
    }
    discount
    quantity
    returned
    subtotal
    total
    vat
    vatPercentage
    kitRevision
    unitQuantity
    unitRate
    product {
      id
      allowConsumptionDecimals
      priceList {
        id
        price
        quantity
      }
      price: itemPrice
      nameTranslation {
        ...translation
      }
      upc
      sku
      categories {
        id
        root {
          id
        }
      }
    }
    service {
      id
      priceList {
        id
        price
        quantity
      }
      price
      nameTranslation {
        ...translation
      }
      sku
      categories {
        id
        root {
          id
        }
      }
    }
    kit {
      id
      nameTranslation {
        ...translation
      }
      price: startingPrice
      categories {
        id
        root {
          id
        }
      }
    }
    vatLabel {
      id
    }
    kitLines {
      id
      unitQuantity
      unitRate
      quantity
      price
      product {
        id
        nameTranslation {
          ...translation
        }
      }
      service {
        id
        nameTranslation {
          ...translation
        }
      }
      unit {
        id
        nameTranslation {
          ...translation
        }
      }
    }
    unit {
      id
      nameTranslation {
        ...translation
      }
    }
  }
  fragment translation on Translation {
    arSa
    enUs
  }
`
export const inventoryMovementRequest = gql`
  fragment InventoryMovementRequest on InventoryMovementRequest {
    date
    id
    lines {
      id
      item {
        id
      }
      product {
        id
        nameTranslation {
          arSa
          enUs
        }
      }
      quantity
    }
    note
    reason
    serialNumber
    status
    target {
      id
      nameTranslation {
        arSa
        enUs
      }
    }
    type
  }
`
export const inventoryMovementRequestSheet = gql`
  fragment InventoryMovementRequestSheet on InventoryMovementRequestSheet {
    id
    serialNumber
    request {
      id
      type
      serialNumber
    }
    destinationMovement {
      id
      serialNumber
    }
    sourceMovement {
      id
      serialNumber
    }
    waste {
      id
      serialNumber
    }
    date
    location {
      id
      nameTranslation {
        arSa
        enUs
      }
    }
    status
    note
    lines {
      id
      product {
        id
        nameTranslation {
          arSa
          enUs
        }
      }
      quantity
      actualQuantity
      received
      waste
    }
  }
`
export const StoreLocationMenuFragment = gql`
  fragment StoreLocationMenu on StoreLocationMenu {
    id
    nameTranslation {
      arSa
      enUs
    }
    active
    columns
    from
    to
    items {
      product {
        id
      }
      service {
        id
      }
      kit {
        id
      }
      columns
      rows
      index
    }
    _revision
  }
`
