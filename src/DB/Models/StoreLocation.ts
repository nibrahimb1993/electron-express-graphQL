import { Model } from 'sequelize'

export class StoreLocationModel extends Model {
  public id!: string // Note that the `null assertion`,  `!` is required in strict mode.
  public _revision!: string
  public data!: string
}
export declare type StoreLocation = Omit<StoreLocationModel, keyof Model>

export const storeLocationParser = (data: any): StoreLocation => {
  return {
    id: data.id,
    _revision: data._revision,
    data: JSON.stringify({
      code: data.code,
      nameTranslation: data.nameTranslation,
      inventoryPhysicalLocation: data.inventoryPhysicalLocation,
      type: data.type,
      paymentMethods: data.paymentMethods,
    }),
  }
}
