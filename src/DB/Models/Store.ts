import { Model } from 'sequelize'
import {
  snapshot_myTerminal_snapshot_store,
  snapshot_myTerminal_snapshot_store_setting,
} from '../../GraphQL/__generated__/snapshot'
import { DBType } from 'types'

// this should be shared type on all models

export class StoreModel extends Model {
  public id!: string // Note that the `null assertion`,  `!` is required in strict mode.
  public _revision!: number
  public data!: string

  public fromDB = (): Store => {
    const data = JSON.parse(this.data)
    return new Store(this.id, this._revision, data.setting)
  }
}
export class Store {
  constructor(
    public id: string,
    public _revision: number,
    public setting: snapshot_myTerminal_snapshot_store_setting
  ) {}

  public static fromSnapshot = (
    object: snapshot_myTerminal_snapshot_store
  ): Store => {
    return new Store(object.id, object._revision, object.setting)
  }

  public toDB = (): DBType => {
    return {
      id: this.id,
      _revision: this._revision,
      data: JSON.stringify({
        setting: this.setting,
      }),
    }
  }
}

// create new class has three functions(from db, to db, from snapshot) and external function for save to db
