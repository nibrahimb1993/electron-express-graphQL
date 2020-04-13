import { Sequelize, Model, DataTypes } from 'sequelize'
import { StoreTerminalModel } from './StoreTerminal'
import { BusinessModel } from './Business'
import { StoreModel } from './Store'
import { PriceModifiersProvidersModel as PriceModifiersProviderModel } from './PriceModifiersProvider'

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
      type: DataTypes.STRING,
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
  await sequelize.sync()
}
