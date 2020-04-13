import { Model } from 'sequelize'
import { snapshot_myTerminal_snapshot_store } from '../../GraphQL/__generated__/snapshot'

export class StoreModel extends Model {
  public id!: string // Note that the `null assertion`,  `!` is required in strict mode.
  public _revision!: number
  public data!: string
}
export declare type Store = Omit<StoreModel, keyof Model>

export const storeParser = (
  data: snapshot_myTerminal_snapshot_store
): Store => {
  return {
    id: data.id,
    _revision: data._revision,
    data: JSON.stringify({
      setting: data.setting,
    }),
  }
}
