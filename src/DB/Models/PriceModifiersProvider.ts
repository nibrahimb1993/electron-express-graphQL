import { Model } from 'sequelize'
import { snapshot_myTerminal_snapshot_priceModifiersProviders } from '../../GraphQL/__generated__/snapshot'

export class PriceModifiersProvidersModel extends Model {
  public id!: string // Note that the `null assertion`,  `!` is required in strict mode.
  public _revision!: number
  public data!: string
}
export declare type PriceModifiersProvider = Omit<
  PriceModifiersProvidersModel,
  keyof Model
>

export const priceModifiersProviderParser = (
  data: snapshot_myTerminal_snapshot_priceModifiersProviders
): PriceModifiersProvider => {
  return {
    id: data.id,
    _revision: data._revision,
    data: JSON.stringify({
      nameTranslation: data.nameTranslation,
      targets: data.targets,
    }),
  }
}
