import { Model } from 'sequelize'
import {
  snapshot_myTerminal_snapshot_location_paymentMethods,
  snapshot_myTerminal_snapshot_location_paymentMethods_nameTranslation,
} from '../../GraphQL/__generated__/snapshot'
import { DBType } from 'types'
import { StoreOrderPaymentType } from '__generated__/globalTypes'

export class PaymentMethodModel extends Model {
  public id!: string // Note that the `null assertion`,  `!` is required in strict mode.
  public _revision!: number
  public data!: string

  public fromDB = (): PaymentMethod => {
    const data: Exclude<
      snapshot_myTerminal_snapshot_location_paymentMethods,
      ['id', '_revision']
    > = JSON.parse(this.data)
    return new PaymentMethod(
      this.id,
      this._revision,
      data.active,
      data.nameTranslation,
      data.paymentMethodType,
      data.defaultForReturn
    )
  }
}
export class PaymentMethod {
  constructor(
    public id: string,
    public _revision: number,
    public active: boolean,
    public nameTranslation: snapshot_myTerminal_snapshot_location_paymentMethods_nameTranslation,
    public paymentMethodType: StoreOrderPaymentType,
    public defaultForReturn: boolean
  ) {}

  public static fromSnapshot = (
    object: snapshot_myTerminal_snapshot_location_paymentMethods
  ): PaymentMethod => {
    return new PaymentMethod(
      object.id,
      object._revision,
      object.active,
      object.nameTranslation,
      object.paymentMethodType,
      object.defaultForReturn
    )
  }

  public toDB = (): DBType => {
    return {
      id: this.id,
      _revision: this._revision,
      data: JSON.stringify({
        active: this.active,
        nameTranslation: this.nameTranslation,
        paymentMethodType: this.paymentMethodType,
        defaultForReturn: this.defaultForReturn,
      }),
    }
  }
}
