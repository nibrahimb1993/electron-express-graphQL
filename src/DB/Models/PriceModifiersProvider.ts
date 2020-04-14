import { Model } from 'sequelize'
import {
  snapshot_myTerminal_snapshot_priceModifiersProviders,
  snapshot_myTerminal_snapshot_priceModifiersProviders_nameTranslation,
  snapshot_myTerminal_snapshot_priceModifiersProviders_targets,
} from '../../GraphQL/__generated__/snapshot'
import { DBType } from 'types'

export class PriceModifiersProvidersModel extends Model {
  public id!: string // Note that the `null assertion`,  `!` is required in strict mode.
  public _revision!: number
  public data!: string
  public fromDB = (): PriceModifiersProvider => {
    const data: Exclude<
      snapshot_myTerminal_snapshot_priceModifiersProviders,
      ['id', '_revision']
    > = JSON.parse(this.data)
    return new PriceModifiersProvider(
      this.id,
      this._revision,
      data.nameTranslation,
      data.targets
    )
  }
}
export class PriceModifiersProvider {
  constructor(
    public id: string,
    public _revision: number,
    public nameTranslation: snapshot_myTerminal_snapshot_priceModifiersProviders_nameTranslation,
    public targets: snapshot_myTerminal_snapshot_priceModifiersProviders_targets | null
  ) {}

  public static fromSnapshot = (
    object: snapshot_myTerminal_snapshot_priceModifiersProviders
  ): PriceModifiersProvider => {
    return new PriceModifiersProvider(
      object.id,
      object._revision,
      object.nameTranslation,
      object.targets
    )
  }

  public toDB = (): DBType => {
    return {
      id: this.id,
      _revision: this._revision,
      data: JSON.stringify({}),
    }
  }
}
