import { Sequelize, Model, DataTypes } from 'sequelize'
import { StoreTerminalModel } from './StoreTerminal'
import { BusinessModel } from './Business'
import { StoreModel } from './Store'
import { PriceModifiersProviderModel } from './PriceModifiersProvider'
import { BankAccountModel } from './BankAccount'
import { CategoryModel } from './Category'
import { CostCenterModel } from './CostCenter'
import { CustomerModel } from './Customer'
import { DriverModel } from './Driver'
import { MenuModel } from './Menu'
import { OrderModel } from './Order'
import { PaymentMethodModel } from './PaymentMethod'
import { StationModel } from './Station'
import { StoreLocationModel } from './StoreLocation'

export const setupDB = async () => {
  const sqlite = require('sqlite3')
  new sqlite.Database('./database.sqlite')
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    define: {
      // The `timestamps` field specify whether or not the `createdAt` and `updatedAt` fields will be created.
      // This was true by default, but now is false by default
      timestamps: false,
    },
  })
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.')
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err)
    })
  const tableBase = {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    _revision: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    data: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  }
  BusinessModel.init(
    {
      ...tableBase,
    },
    {
      tableName: 'business',
      sequelize, // this bit is important
    }
  )
  StoreTerminalModel.init(
    {
      ...tableBase,
    },
    {
      tableName: 'storeTerminals',
      sequelize,
    }
  )
  StoreModel.init(
    {
      ...tableBase,
    },
    {
      tableName: 'stores',
      sequelize,
    }
  )
  PriceModifiersProviderModel.init(
    {
      ...tableBase,
    },
    {
      tableName: 'priceModifiersProviders',
      sequelize,
    }
  )
  BankAccountModel.init(
    {
      ...tableBase,
    },
    {
      tableName: 'bankAccounts',
      sequelize,
    }
  )
  CategoryModel.init(
    {
      ...tableBase,
    },
    {
      tableName: 'categories',
      sequelize,
    }
  )
  CostCenterModel.init(
    {
      ...tableBase,
    },
    {
      tableName: 'costCenters',
      sequelize,
    }
  )
  CustomerModel.init(
    {
      ...tableBase,
    },
    {
      tableName: 'customers',
      sequelize,
    }
  )
  DriverModel.init(
    {
      ...tableBase,
    },
    {
      tableName: 'drivers',
      sequelize,
    }
  )
  MenuModel.init(
    {
      ...tableBase,
    },
    {
      tableName: 'menus',
      sequelize,
    }
  )
  OrderModel.init(
    {
      ...tableBase,
    },
    {
      tableName: 'orders',
      sequelize,
    }
  )
  PaymentMethodModel.init(
    {
      ...tableBase,
    },
    {
      tableName: 'paymentMethods',
      sequelize,
    }
  )
  StationModel.init(
    {
      ...tableBase,
    },
    {
      tableName: 'stations',
      sequelize,
    }
  )
  StoreLocationModel.init(
    {
      ...tableBase,
    },
    {
      tableName: 'storeLocations',
      sequelize,
    }
  )
  await sequelize.sync()
}
