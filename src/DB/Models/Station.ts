import { Model } from 'sequelize'
import {
  snapshot_myTerminal_snapshot_location_stations,
  snapshot_myTerminal_snapshot_location_stations_categories,
} from '../../GraphQL/__generated__/snapshot'
import { DBType } from 'types'
import { CIDR } from 'types/backend'

export class StationModel extends Model {
  public id!: string // Note that the `null assertion`,  `!` is required in strict mode.
  public _revision!: number
  public data!: string
  public fromDB = (): Station => {
    const data: Exclude<
      snapshot_myTerminal_snapshot_location_stations,
      ['id', '_revision']
    > = JSON.parse(this.data)
    return new Station(
      this.id,
      this._revision,
      data.name,
      data.printerIp,
      data.numberOfCopies,
      data.categories
    )
  }
}
export class Station {
  constructor(
    public id: string,
    public _revision: number,
    public name: string,
    public printerIp: CIDR | null,
    public numberOfCopies: number,
    public categories: snapshot_myTerminal_snapshot_location_stations_categories[]
  ) {}

  public static fromSnapshot = (
    object: snapshot_myTerminal_snapshot_location_stations
  ): Station => {
    return new Station(
      object.id,
      object._revision,
      object.name,
      object.printerIp,
      object.numberOfCopies,
      object.categories
    )
  }

  public toDB = (): DBType => {
    return {
      id: this.id,
      _revision: this._revision,
      data: JSON.stringify({
        name: this.name,
        printerIp: this.printerIp,
        numberOfCopies: this.numberOfCopies,
        categories: this.categories,
      }),
    }
  }
}
