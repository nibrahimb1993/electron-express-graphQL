import { Model } from 'sequelize'
import { snapshot_myTerminal } from '../../GraphQL/__generated__/snapshot'

export class StoreTerminalModel extends Model {
  public id!: string // Note that the `null assertion`,  `!` is required in strict mode.
  public _revision!: number
  public data!: string
}
export declare type StoreTerminal = Omit<StoreTerminalModel, keyof Model>

export const storeTerminalParser = (
  data: snapshot_myTerminal
): StoreTerminal => {
  return {
    id: data.id,
    _revision: data._revision,
    data: JSON.stringify({
      code: data.code,
      nameTranslation: data.nameTranslation,
      keepLocalDataDuration: data.keepLocalDataDuration,
      location: { id: data.location.id },
    }),
  }
}
