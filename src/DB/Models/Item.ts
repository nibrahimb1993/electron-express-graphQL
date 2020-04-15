import { Model } from 'sequelize'
import {
  snapshot_myTerminal_snapshot_location_drivers,
  snapshot_myTerminal_snapshot_kits,
  snapshot_myTerminal_snapshot_products,
  snapshot_myTerminal_snapshot_products_priceList,
  snapshot_myTerminal_snapshot_products_nameTranslation,
  snapshot_myTerminal_snapshot_products_albumCover,
  snapshot_myTerminal_snapshot_products_units,
  snapshot_myTerminal_snapshot_products_vatLabel,
  snapshot_myTerminal_snapshot_products_categories,
  snapshot_myTerminal_snapshot_services,
  snapshot_myTerminal_snapshot_services_nameTranslation,
  snapshot_myTerminal_snapshot_services_albumCover,
  snapshot_myTerminal_snapshot_services_priceList,
  snapshot_myTerminal_snapshot_services_vatLabel,
  snapshot_myTerminal_snapshot_services_categories,
  snapshot_myTerminal_snapshot_kits_nameTranslation,
  snapshot_myTerminal_snapshot_kits_categories,
  snapshot_myTerminal_snapshot_kits_albumCover,
  snapshot_myTerminal_snapshot_kits_lines,
  snapshot_myTerminal_snapshot_kits_vatLabel,
} from '../../GraphQL/__generated__/snapshot'
import { DBType } from 'types'
import { Decimal } from 'types/backend'

export class ItemModel extends Model {
  public id!: string // Note that the `null assertion`,  `!` is required in strict mode.
  public _revision!: number
  public data!: string
  public sku!: string
  public upc!: string
  public type!: 'Product' | 'Service' | 'StoreKit'

  public fromDB = (): Product | Service | StoreKit => {
    switch (this.type) {
      case 'Product':
        const productData: Exclude<
          snapshot_myTerminal_snapshot_products,
          ['id', '_revision', 'sku', 'upc']
        > = JSON.parse(this.data)
        return new Product(
          this.id,
          this._revision,
          this.sku,
          this.upc,
          productData.allowConsumptionDecimals,
          productData.priceList,
          productData.nameTranslation,
          productData.albumCover,
          productData.units,
          productData.itemPrice,
          productData.listed,
          productData.vatPercentage,
          productData.vatLabel,
          productData.sellable,
          productData.categories
        )
      case 'Service':
        const serviceData: Exclude<
          snapshot_myTerminal_snapshot_services,
          ['id', '_revision', 'sku']
        > = JSON.parse(this.data)
        return new Service(
          this.id,
          this._revision,
          this.sku,
          serviceData.nameTranslation,
          serviceData.albumCover,
          serviceData.priceList,
          serviceData.price,
          serviceData.listed,
          serviceData.vatPercentage,
          serviceData.vatLabel,
          serviceData.sellable,
          serviceData.categories
        )
      case 'StoreKit':
        const kitData: Exclude<
          snapshot_myTerminal_snapshot_kits,
          ['id', '_revision', 'sku']
        > = JSON.parse(this.data)
        return new StoreKit(
          this.id,
          this._revision,
          this.sku,
          kitData.name,
          kitData.nameTranslation,
          kitData.minimumNumberOfItems,
          kitData.maximumNumberOfItems,
          kitData.startingPrice,
          kitData.listed,
          kitData.categories,
          kitData.albumCover,
          kitData.revision,
          kitData.lines,
          kitData.vatPercentage,
          kitData.vatLabel
        )
    }
  }
}
export class StoreKit {
  constructor(
    public id: string,
    public _revision: number,
    public sku: string | null,
    public name: string,
    public nameTranslation: snapshot_myTerminal_snapshot_kits_nameTranslation,
    public minimumNumberOfItems: Decimal,
    public maximumNumberOfItems: Decimal,
    public startingPrice: Decimal,
    public listed: boolean,
    public categories: snapshot_myTerminal_snapshot_kits_categories[],
    public albumCover: snapshot_myTerminal_snapshot_kits_albumCover | null,
    public revision: number,
    public lines: snapshot_myTerminal_snapshot_kits_lines[],
    public vatPercentage: Decimal | null,
    public vatLabel: snapshot_myTerminal_snapshot_kits_vatLabel | null
  ) {}
  public static fromSnapshot = (
    object: snapshot_myTerminal_snapshot_kits
  ): StoreKit => {
    return new StoreKit(
      object.id,
      object._revision,
      object.sku,
      object.name,
      object.nameTranslation,
      object.minimumNumberOfItems,
      object.maximumNumberOfItems,
      object.startingPrice,
      object.listed,
      object.categories,
      object.albumCover,
      object.revision,
      object.lines,
      object.vatPercentage,
      object.vatLabel
    )
  }
  public toDB = (): DBType & {
    sku: string | null
    type: 'Product' | 'Service' | 'StoreKit'
  } => {
    return {
      id: this.id,
      _revision: this._revision,
      sku: this.sku,
      type: 'StoreKit',
      data: JSON.stringify({
        name: this.name,
        nameTranslation: this.nameTranslation,
        minimumNumberOfItems: this.minimumNumberOfItems,
        maximumNumberOfItems: this.maximumNumberOfItems,
        startingPrice: this.startingPrice,
        listed: this.listed,
        categories: this.categories,
        albumCover: this.albumCover,
        revision: this.revision,
        lines: this.lines,
        vatPercentage: this.vatPercentage,
        vatLabel: this.vatLabel,
      }),
    }
  }
}
export class Service {
  constructor(
    public id: string,
    public _revision: number,
    public sku: string | null,
    public nameTranslation: snapshot_myTerminal_snapshot_services_nameTranslation,
    public albumCover: snapshot_myTerminal_snapshot_services_albumCover | null,
    public priceList: snapshot_myTerminal_snapshot_services_priceList[],
    public price: Decimal,
    public listed: boolean,
    public vatPercentage: Decimal | null,
    public vatLabel: snapshot_myTerminal_snapshot_services_vatLabel | null,
    public sellable: boolean,
    public categories: snapshot_myTerminal_snapshot_services_categories[]
  ) {}
  public static fromSnapshot = (
    object: snapshot_myTerminal_snapshot_services
  ): Service => {
    return new Service(
      object.id,
      object._revision,
      object.sku,
      object.nameTranslation,
      object.albumCover,
      object.priceList,
      object.price,
      object.listed,
      object.vatPercentage,
      object.vatLabel,
      object.sellable,
      object.categories
    )
  }
  public toDB = (): DBType & {
    sku: string | null
    type: 'Product' | 'Service' | 'StoreKit'
  } => {
    return {
      id: this.id,
      _revision: this._revision,
      sku: this.sku,
      type: 'Service',
      data: JSON.stringify({
        nameTranslation: this,
        albumCover: this,
        priceList: this,
        price: this,
        listed: this,
        vatPercentage: this,
        vatLabel: this,
        sellable: this,
        categories: this,
      }),
    }
  }
}
export class Product {
  constructor(
    public id: string,
    public _revision: number,
    public sku: string | null,
    public upc: string | null,
    public allowConsumptionDecimals: boolean,
    public priceList: snapshot_myTerminal_snapshot_products_priceList[],
    public nameTranslation: snapshot_myTerminal_snapshot_products_nameTranslation,
    public albumCover: snapshot_myTerminal_snapshot_products_albumCover | null,
    public units: snapshot_myTerminal_snapshot_products_units[],
    public itemPrice: Decimal,
    public listed: boolean,
    public vatPercentage: Decimal | null,
    public vatLabel: snapshot_myTerminal_snapshot_products_vatLabel | null,
    public sellable: boolean,
    public categories: snapshot_myTerminal_snapshot_products_categories[]
  ) {}
  public static fromSnapshot = (
    object: snapshot_myTerminal_snapshot_products
  ): Product => {
    return new Product(
      object.id,
      object._revision,
      object.sku,
      object.upc,
      object.allowConsumptionDecimals,
      object.priceList,
      object.nameTranslation,
      object.albumCover,
      object.units,
      object.itemPrice,
      object.listed,
      object.vatPercentage,
      object.vatLabel,
      object.sellable,
      object.categories
    )
  }
  public toDB = (): DBType & {
    upc: string | null
    sku: string | null
    type: 'Product' | 'Service' | 'StoreKit'
  } => {
    return {
      id: this.id,
      _revision: this._revision,
      sku: this.sku,
      upc: this.upc,
      type: 'Product',
      data: JSON.stringify({
        allowConsumptionDecimals: this.allowConsumptionDecimals,
        priceList: this.priceList,
        nameTranslation: this.nameTranslation,
        albumCover: this.albumCover,
        units: this.units,
        itemPrice: this.itemPrice,
        listed: this.listed,
        vatPercentage: this.vatPercentage,
        vatLabel: this.vatLabel,
        sellable: this.sellable,
        categories: this.categories,
      }),
    }
  }
}
