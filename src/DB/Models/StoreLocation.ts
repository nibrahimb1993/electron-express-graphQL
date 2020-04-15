import { Model } from 'sequelize'
import {
  snapshot_myTerminal_snapshot_location,
  snapshot_myTerminal_snapshot_location_nameTranslation,
  snapshot_myTerminal_snapshot_location_inventoryPhysicalLocation,
  snapshot_myTerminal_snapshot_location_deliveryService,
} from '../../GraphQL/__generated__/snapshot'
import { DBType } from 'types'
import { StoreLocationType } from '__generated__/globalTypes'
import { storeTerminalNotification_storeTerminalNotification_record_StoreLocation } from 'GraphQL/__generated__/storeTerminalNotification'

export class StoreLocationModel extends Model {
  public id!: string // Note that the `null assertion`,  `!` is required in strict mode.
  public _revision!: number
  public data!: string

  public fromDB = (): StoreLocation => {
    const data: Exclude<
      snapshot_myTerminal_snapshot_location,
      ['id', '_revision']
    > = JSON.parse(this.data)
    return new StoreLocation(
      this.id,
      this._revision,
      data.code,
      data.type,
      data.nameTranslation,
      data.inventoryPhysicalLocation,
      data.deliveryService
    )
  }
}
export class StoreLocation {
  constructor(
    public id: string,
    public _revision: number,
    public code: string,
    public type: StoreLocationType,
    public nameTranslation: snapshot_myTerminal_snapshot_location_nameTranslation,
    public inventoryPhysicalLocation: snapshot_myTerminal_snapshot_location_inventoryPhysicalLocation,
    public deliveryService: snapshot_myTerminal_snapshot_location_deliveryService | null
  ) {}

  public static fromSnapshot = (
    object:
      | snapshot_myTerminal_snapshot_location
      | storeTerminalNotification_storeTerminalNotification_record_StoreLocation
  ): StoreLocation => {
    return new StoreLocation(
      object.id,
      object._revision,
      object.code,
      object.type,
      object.nameTranslation,
      object.inventoryPhysicalLocation,
      object.deliveryService
    )
  }

  public toDB = (): DBType => {
    return {
      id: this.id,
      _revision: this._revision,
      data: JSON.stringify({
        code: this.code,
        type: this.type,
        nameTranslation: this.nameTranslation,
        inventoryPhysicalLocation: this.inventoryPhysicalLocation,
        deliveryService: this.deliveryService,
      }),
    }
  }
}
