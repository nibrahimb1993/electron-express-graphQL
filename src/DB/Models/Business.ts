import { Model } from 'sequelize'
import {
  snapshot_myTerminal_snapshot_business,
  snapshot_myTerminal_snapshot_business_country,
  snapshot_myTerminal_snapshot_business_invoiceSettings,
  snapshot_myTerminal_snapshot_business_theme,
  snapshot_myTerminal_snapshot_business_defaultVatLabel,
  snapshot_myTerminal_snapshot_business_avatar,
} from '../../GraphQL/__generated__/snapshot'
import { DBType } from 'types'
import { Currency } from '__generated__/globalTypes'

export class BusinessModel extends Model {
  public id!: string
  public data!: string
  public _revision!: number

  public fromDB = (): Business => {
    const data: Exclude<
      snapshot_myTerminal_snapshot_business,
      ['id', '_revision']
    > = JSON.parse(this.data)
    return new Business(
      this.id,
      this._revision,
      data.name,
      data.country,
      data.invoiceSettings,
      data.theme,
      data.defaultVatLabel,
      data.currency,
      data.receiptMessage,
      data.vatNumber,
      data.avatar
    )
  }
}
export class Business {
  constructor(
    public id: string,
    public _revision: number,
    public name: string,
    public country: snapshot_myTerminal_snapshot_business_country | null,
    public invoiceSettings: snapshot_myTerminal_snapshot_business_invoiceSettings | null,
    public theme: snapshot_myTerminal_snapshot_business_theme | null,
    public defaultVatLabel: snapshot_myTerminal_snapshot_business_defaultVatLabel | null,
    public currency: Currency,
    public receiptMessage: string | null,
    public vatNumber: string | null,
    public avatar: snapshot_myTerminal_snapshot_business_avatar | null
  ) {}

  public static fromSnapshot = (
    object: snapshot_myTerminal_snapshot_business
  ): Business => {
    return new Business(
      object.id,
      object._revision,
      object.name,
      object.country,
      object.invoiceSettings,
      object.theme,
      object.defaultVatLabel,
      object.currency,
      object.receiptMessage,
      object.vatNumber,
      object.avatar
    )
  }

  public toDB = (): DBType => {
    return {
      id: this.id,
      _revision: this._revision,
      data: JSON.stringify({
        name: this.name,
        country: this.country,
        invoiceSettings: this.invoiceSettings,
        theme: this.theme,
        defaultVatLabel: this.defaultVatLabel,
        currency: this.currency,
        receiptMessage: this.receiptMessage,
        vatNumber: this.vatNumber,
        avatar: this.avatar,
      }),
    }
  }
}
