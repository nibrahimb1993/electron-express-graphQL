import { Model } from 'sequelize'
import {
  snapshot_myTerminal_snapshot_categories,
  snapshot_myTerminal_snapshot_categories_nameTranslation,
  snapshot_myTerminal_snapshot_categories_parent,
  snapshot_myTerminal_snapshot_categories_root,
} from '../../GraphQL/__generated__/snapshot'
import { DBType } from 'types'
import { CategoryIcon } from '__generated__/globalTypes'

export class CategoryModel extends Model {
  public id!: string // Note that the `null assertion`,  `!` is required in strict mode.
  public _revision!: number
  public data!: string

  public fromDB = (): Category => {
    const data: Exclude<
      snapshot_myTerminal_snapshot_categories,
      ['id', '_revision']
    > = JSON.parse(this.data)
    return new Category(
      this.id,
      this._revision,
      data.nameTranslation,
      data.icon,
      data.parent,
      data.root
    )
  }
}
export class Category {
  constructor(
    public id: string,
    public _revision: number,
    public nameTranslation: snapshot_myTerminal_snapshot_categories_nameTranslation,
    public icon: CategoryIcon | null,
    public parent: snapshot_myTerminal_snapshot_categories_parent | null,
    public root: snapshot_myTerminal_snapshot_categories_root
  ) {}

  public static fromSnapshot = (
    object: snapshot_myTerminal_snapshot_categories
  ): Category => {
    return new Category(
      object.id,
      object._revision,
      object.nameTranslation,
      object.icon,
      object.parent,
      object.root
    )
  }

  public toDB = (): DBType => {
    return {
      id: this.id,
      _revision: this._revision,
      data: JSON.stringify({
        nameTranslation: this.nameTranslation,
        icon: this.icon,
        parent: this.parent,
        root: this.root,
      }),
    }
  }
}
