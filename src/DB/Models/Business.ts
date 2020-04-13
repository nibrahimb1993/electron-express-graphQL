import { Model } from 'sequelize'
import { snapshot_myTerminal_snapshot_business } from '../../GraphQL/__generated__/snapshot'

export class BusinessModel extends Model {
  public id!: string
  public data!: string
  public _revision!: number
}
export declare type Business = Omit<BusinessModel, keyof Model>

export const businessParser = (
  data: snapshot_myTerminal_snapshot_business
): Business => {
  return {
    id: data.id,
    _revision: data._revision,
    data: JSON.stringify({
      name: data.name,
      country: data.country,
      invoiceSettings: data.invoiceSettings,
      theme: data.theme,
      defaultVatLabel: data.defaultVatLabel,
      currency: data.currency,
      receiptMessage: data.receiptMessage,
      vatNumber: data.vatNumber,
      avatar: data.avatar,
    }),
  }
}
