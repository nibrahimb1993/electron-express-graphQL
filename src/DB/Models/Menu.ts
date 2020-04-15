import { Model } from 'sequelize'
import {
  snapshot_myTerminal_snapshot_location_menus_entries,
  snapshot_myTerminal_snapshot_location_menus_entries_nameTranslation,
  snapshot_myTerminal_snapshot_location_menus_entries_items,
} from '../../GraphQL/__generated__/snapshot'
import { DBType } from 'types'
import { Time } from 'types/backend'

export class MenuModel extends Model {
  public id!: string // Note that the `null assertion`,  `!` is required in strict mode.
  public _revision!: number
  public data!: string
  public fromDB = (): Menu => {
    const data: Exclude<
      snapshot_myTerminal_snapshot_location_menus_entries,
      ['id', '_revision']
    > = JSON.parse(this.data)
    return new Menu(
      this.id,
      this._revision,
      data.nameTranslation,
      data.active,
      data.columns,
      data.from,
      data.to,
      data.items
    )
  }
}
export class Menu {
  constructor(
    public id: string,
    public _revision: number,
    public nameTranslation: snapshot_myTerminal_snapshot_location_menus_entries_nameTranslation,
    public active: boolean,
    public columns: number,
    public from: Time,
    public to: Time,
    public items: snapshot_myTerminal_snapshot_location_menus_entries_items[]
  ) /**
   * internal field
   */
  {}

  public static fromSnapshot = (
    object: snapshot_myTerminal_snapshot_location_menus_entries
  ): Menu => {
    return new Menu(
      object.id,
      object._revision,
      object.nameTranslation,
      object.active,
      object.columns,
      object.from,
      object.to,
      object.items
    )
  }

  public toDB = (): DBType => {
    return {
      id: this.id,
      _revision: this._revision,
      data: JSON.stringify({
        nameTranslation: this.nameTranslation,
        active: this.active,
        columns: this.columns,
        from: this.from,
        to: this.to,
        items: this.items,
      }),
    }
  }
}
