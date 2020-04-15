import { Model } from 'sequelize'
import {
  snapshot_myTerminal_snapshot_location_bankAccounts_entries,
  snapshot_myTerminal_snapshot_location_bankAccounts_entries_bankAccount,
  snapshot_myTerminal_snapshot_location_bankAccounts_entries_membership,
} from '../../GraphQL/__generated__/snapshot'
import { DBType } from 'types'

export class BankAccountModel extends Model {
  public id!: string // Note that the `null assertion`,  `!` is required in strict mode.
  public _revision!: number
  public data!: string

  public fromDB = (): BankAccount => {
    const data: Exclude<
      snapshot_myTerminal_snapshot_location_bankAccounts_entries,
      ['id', '_revision']
    > = JSON.parse(this.data)
    return new BankAccount(
      this.id,
      this._revision,
      data.bankAccount,
      data.membership
    )
  }
}
export class BankAccount {
  constructor(
    public id: string,
    public _revision: number,
    public bankAccount: snapshot_myTerminal_snapshot_location_bankAccounts_entries_bankAccount,
    public membership: snapshot_myTerminal_snapshot_location_bankAccounts_entries_membership
  ) {}

  public static fromSnapshot = (
    object: snapshot_myTerminal_snapshot_location_bankAccounts_entries
  ): BankAccount => {
    return new BankAccount(
      object.id,
      object._revision,
      object.bankAccount,
      object.membership
    )
  }

  public toDB = (): DBType => {
    return {
      id: this.id,
      _revision: this._revision,
      data: JSON.stringify({
        bankAccount: this.bankAccount,
        membership: this.membership,
      }),
    }
  }
}
