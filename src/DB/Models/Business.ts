import { Model } from 'sequelize'

export class BusinessModel extends Model {
  public id!: string
  public data!: string

  public _revision!: string
}
export declare type Business = Omit<BusinessModel, keyof Model>

export const businessParser = (data: any): Business => {
  return {
    id: data.id,
    _revision: data._revision,
    data: JSON.stringify({
      name: data.name,
      country: {
        id: data.country?.id,
        nameTranslation: {
          arSa: data.country?.arSa,
          enUs: data.country?.enUs,
        },
      },
      invoiceSettings: {
        id: data.invoiceSettings?.id,
        value: data.invoiceSettings?.value,
      },
      theme: {
        id: data.theme?.id,
        value: data.theme?.value,
      },
      defaultVatLabel: {
        id: data.defaultVatLabel?.id,
        nameTranslation: {
          arSa: data.defaultVatLabel?.nameTranslation?.arSa,
          enUs: data.defaultVatLabel?.nameTranslation?.enUs,
        },
        percentage: data.defaultVatLabel?.percentage,
      },
      currency: data.currency,
      receiptMessage: data.receiptMessage,
      vatNumber: data.vatNumber,
      avatar: {
        url: data.avatar?.url,
      },
    }),
  }
}
