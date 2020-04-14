import { Model } from 'sequelize'
import {
  snapshot_myTerminal,
  snapshot_myTerminal_nameTranslation,
  snapshot_myTerminal_location,
} from '../../GraphQL/__generated__/snapshot'
import { DBType } from 'types'

export class StoreTerminalModel extends Model {
  public id!: string // Note that the `null assertion`,  `!` is required in strict mode.
  public _revision!: number
  public data!: string

  public fromDB = (): StoreTerminal => {
    const data: Exclude<snapshot_myTerminal, ['id', '_revision']> = JSON.parse(
      this.data
    )
    return new StoreTerminal(
      this.id,
      this._revision,
      data.code,
      data.nameTranslation,
      data.keepLocalDataDuration,
      data.location
    )
  }
}
export class StoreTerminal {
  constructor(
    public id: string,
    public _revision: number,
    public code: string,
    public nameTranslation: snapshot_myTerminal_nameTranslation,
    public keepLocalDataDuration: number,
    public location: snapshot_myTerminal_location
  ) {}

  public static fromSnapshot = (object: snapshot_myTerminal): StoreTerminal => {
    return new StoreTerminal(
      object.id,
      object._revision,
      object.code,
      object.nameTranslation,
      object.keepLocalDataDuration,
      object.location
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
