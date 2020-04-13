import { Model } from 'sequelize'

export class PriceModifiersProvidersModel extends Model {
  public id!: string // Note that the `null assertion`,  `!` is required in strict mode.
  public _revision!: string
  public data!: string
}
export declare type PriceModifiersProvider = Omit<
  PriceModifiersProvidersModel,
  keyof Model
>

export const priceModifiersProviderParser = (
  data: any
): PriceModifiersProvider => {
  return {
    id: data.id,
    _revision: data._revision,
    data: JSON.stringify({
      nameTranslation: {
        arSa: data.nameTranslation?.arSa,
        enUs: data.nameTranslation?.enUs,
      },
      targets: {
        entries: {
          _revision: data.targets?.entries?._revision,
          additionalPrice: data.targets?.entries?.additionalPrice,
          id: data.targets?.entries?.id,
          item: {
            id: data.targets?.entries?.item?.id,
          },
        },
      },
    }),
  }
}
