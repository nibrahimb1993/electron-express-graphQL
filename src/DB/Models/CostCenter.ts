import { Model } from 'sequelize'
import {
  snapshot_myTerminal_snapshot_location_costCenters_entries,
  snapshot_myTerminal_snapshot_location_costCenters_entries_nameTranslation,
  snapshot_myTerminal_snapshot_location_costCenters_entries_group,
} from '../../GraphQL/__generated__/snapshot'
import { DBType } from 'types'

export class CostCenterModel extends Model {
  public id!: string // Note that the `null assertion`,  `!` is required in strict mode.
  public _revision!: number
  public data!: string

  public fromDB = (): CostCenter => {
    const data: Exclude<
      snapshot_myTerminal_snapshot_location_costCenters_entries,
      ['id', '_revision']
    > = JSON.parse(this.data)
    return new CostCenter(
      this.id,
      this._revision,
      data.nameTranslation,
      data.group
    )
  }
}
export class CostCenter {
  constructor(
    public id: string,
    public _revision: number,
    public nameTranslation: snapshot_myTerminal_snapshot_location_costCenters_entries_nameTranslation,
    public group: snapshot_myTerminal_snapshot_location_costCenters_entries_group
  ) {}

  public static fromSnapshot = (
    object: snapshot_myTerminal_snapshot_location_costCenters_entries
  ): CostCenter => {
    return new CostCenter(
      object.id,
      object._revision,
      object.nameTranslation,
      object.group
    )
  }

  public toDB = (): DBType => {
    return {
      id: this.id,
      _revision: this._revision,
      data: JSON.stringify({
        nameTranslation: this.nameTranslation,
        group: this.group,
      }),
    }
  }
}
