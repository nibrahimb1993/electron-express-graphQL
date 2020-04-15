import { Model } from 'sequelize'
import { snapshot_myTerminal_snapshot_location_drivers } from '../../GraphQL/__generated__/snapshot'
import { DBType } from 'types'

export class DriverModel extends Model {
  public id!: string // Note that the `null assertion`,  `!` is required in strict mode.
  public _revision!: number
  public data!: string

  public fromDB = (): Driver => {
    const data: Exclude<
      snapshot_myTerminal_snapshot_location_drivers,
      ['id', '_revision']
    > = JSON.parse(this.data)
    return new Driver(this.id, this._revision, data.name, data.active)
  }
}
export class Driver {
  constructor(
    public id: string,
    public _revision: number,
    public name: string,
    public active: boolean
  ) {}

  public static fromSnapshot = (
    object: snapshot_myTerminal_snapshot_location_drivers
  ): Driver => {
    return new Driver(object.id, object._revision, object.name, object.active)
  }

  public toDB = (): DBType => {
    return {
      id: this.id,
      _revision: this._revision,
      data: JSON.stringify({
        name: this.name,
        active: this.active,
      }),
    }
  }
}
